# ============================================================
# Dockerfile — Portfolio Backend
# Base: php:8.2-apache
# Ekstensi: pdo_sqlite
# Deploy target: Railway.app (PORT env var di-inject otomatis)
# ============================================================

FROM php:8.2-apache

# Install system dependency libsqlite3-dev DULU, baru install ekstensi PHP
# Tanpa ini, docker-php-ext-install pdo_sqlite akan gagal
RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_sqlite

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
RUN printf '#!/bin/bash\nPORT=${PORT:-80}\nsed -i "s/Listen 80/Listen $PORT/" /etc/apache2/ports.conf\nsed -i "s/<VirtualHost \*:80>/<VirtualHost *:$PORT>/" /etc/apache2/sites-enabled/000-default.conf\nexec apache2-foreground\n' > /usr/local/bin/start.sh \
    && chmod +x /usr/local/bin/start.sh

# Expose PORT (Railway override ini otomatis)
EXPOSE 80

CMD ["/usr/local/bin/start.sh"]
