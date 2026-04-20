# ============================================================
# Dockerfile — Portfolio Backend (PHP Built-in Server)
# Ganti Apache dengan php -S untuk menghindari MPM conflict.
# PHP built-in server cukup untuk traffic ringan contact form.
# Deploy target: Railway.app
# ============================================================

FROM php:8.2-cli

# Install PDO SQLite (+ libsqlite3-dev sebagai system dependency)
RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_sqlite

# Direktori SQLite — di luar /app agar tidak bisa diakses via HTTP
RUN mkdir -p /var/www/data && chmod 755 /var/www/data

WORKDIR /app
COPY . /app/

# Railway inject $PORT secara dinamis.
# php -S langsung support env var tanpa konfigurasi tambahan.
EXPOSE 80
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-80} -t /app/ /app/router.php"]
