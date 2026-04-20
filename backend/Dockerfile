# ============================================================
# Dockerfile — Portfolio Backend
# Base: php:8.2-apache
# Ekstensi: pdo_sqlite
# Deploy target: Railway.app (PORT env var di-inject otomatis)
# ============================================================

FROM php:8.2-apache

# Install PDO SQLite extension
RUN docker-php-ext-install pdo_sqlite

# Enable Apache mod_rewrite untuk .htaccess routing
RUN a2enmod rewrite

# Izinkan .htaccess override di direktori web root
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Buat direktori untuk SQLite database (writable, di luar web root)
RUN mkdir -p /var/www/data && chown www-data:www-data /var/www/data

# Copy semua file backend ke web root Apache
COPY . /var/www/html/

# Pastikan permissions benar
RUN chown -R www-data:www-data /var/www/html

# ── Startup script ──────────────────────────────────────────
# Railway meng-inject PORT secara dinamis. Script ini membaca
# $PORT dan mengkonfigurasi Apache sebelum start.
RUN printf '#!/bin/bash\n\
PORT=${PORT:-80}\n\
sed -i "s/Listen 80/Listen $PORT/" /etc/apache2/ports.conf\n\
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:$PORT>/" /etc/apache2/sites-enabled/000-default.conf\n\
exec apache2-foreground\n' > /usr/local/bin/start.sh \
    && chmod +x /usr/local/bin/start.sh

# Expose PORT (Railway override ini otomatis)
EXPOSE 80

CMD ["/usr/local/bin/start.sh"]
