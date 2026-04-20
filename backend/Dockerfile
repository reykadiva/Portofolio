# ============================================================
# Dockerfile — Portfolio Backend
# Base: php:8.2-apache
# Deploy target: Railway.app
# ============================================================

FROM php:8.2-apache

# Install system dependency libsqlite3-dev + PDO SQLite extension
RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_sqlite

# Fix MPM conflict: mod_php hanya kompatibel dengan mpm_prefork.
# Disable mpm_event & mpm_worker, lalu aktifkan mpm_prefork + rewrite.
RUN a2dismod mpm_event mpm_worker 2>/dev/null || true \
    && a2enmod mpm_prefork rewrite

# Izinkan .htaccess override
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Buat direktori SQLite di luar web root (tidak bisa diakses publik)
RUN mkdir -p /var/www/data && chown www-data:www-data /var/www/data

# Copy semua file ke web root
COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html

# Startup script: Railway inject $PORT secara dinamis,
# script ini update konfigurasi Apache sebelum start.
RUN printf '#!/bin/bash\nPORT=${PORT:-80}\nsed -i "s/Listen 80/Listen $PORT/" /etc/apache2/ports.conf\nsed -i "s/<VirtualHost \*:80>/<VirtualHost *:$PORT>/" /etc/apache2/sites-enabled/000-default.conf\nexec apache2-foreground\n' \
    > /usr/local/bin/start.sh && chmod +x /usr/local/bin/start.sh

EXPOSE 80
CMD ["/usr/local/bin/start.sh"]
