# ============================================================
# Dockerfile — Portfolio Backend
# Base: php:8.2-apache
# Ekstensi: pdo_sqlite
# Deploy target: Render.com (Root Directory: backend)
# ============================================================

FROM php:8.2-apache

# Install PDO SQLite extension
RUN docker-php-ext-install pdo_sqlite

# Enable Apache mod_rewrite untuk .htaccess routing
RUN a2enmod rewrite

# Izinkan .htaccess override di direktori web root
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Buat direktori untuk SQLite database (writable)
RUN mkdir -p /var/www/data && chown www-data:www-data /var/www/data

# Copy semua file backend ke web root Apache
COPY . /var/www/html/

# Pastikan permissions benar untuk direktori data SQLite
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 (Render memetakan ini ke HTTPS secara otomatis)
EXPOSE 80
