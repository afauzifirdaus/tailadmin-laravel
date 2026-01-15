FROM ubuntu:22.04

# 1. INSTALL ALAT (curl & gnupg) DULU
# Ini wajib dilakukan pertama kali agar langkah berikutnya bisa jalan
RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    curl \
    gnupg \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# 2. SEKARANG BARU BISA PAKAI CURL & GPG
# Menambahkan repo NodeSource untuk Node.js 18
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# 3. INSTALL NODEJS & PHP
# Hapus 'npm' dari daftar karena sudah otomatis ada di dalam 'nodejs'
RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    apache2 \
    php \
    nodejs \
    php-xml \
    php-mbstring \
    php-curl \
    php-mysql \
    php-gd \
    unzip \
    nano && \
    rm -rf /var/lib/apt/lists/*

# 4. INSTALL COMPOSER
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# 5. SETUP APLIKASI
RUN mkdir -p /var/www/tailadmin-laravel
WORKDIR /var/www/tailadmin-laravel

# Pastikan sudah ada .dockerignore agar tidak copy node_modules lokal
ADD . /var/www/tailadmin-laravel
ADD server.conf /etc/apache2/sites-available/
RUN a2dissite 000-default.conf && a2ensite server.conf

# 6. PERMISSIONS
RUN mkdir -p bootstrap/cache storage/framework/cache storage/framework/sessions storage/framework/views && \
    chown -R www-data:www-data bootstrap storage && \
    chmod -R ug+rwx bootstrap storage

# 7. RUN INSTALL SCRIPT
RUN chmod +x install.sh && ./install.sh

RUN chown -R www-data:www-data /var/www/tailadmin-laravel && \
    chmod -R 755 /var/www/tailadmin-laravel

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
