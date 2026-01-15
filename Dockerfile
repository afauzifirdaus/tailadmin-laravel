FROM ubuntu:22.04

# 1. Ganti mirror Ubuntu ke alamat yang lebih stabil (DigitalOcean Mirror)
# Ini dilakukan sebelum apt-get update untuk menghindari "Mirror sync in progress"
RUN sed -i 's|http://archive.ubuntu.com/ubuntu/|http://mirrors.digitalocean.com/ubuntu/|g' /etc/apt/sources.list && \
    sed -i 's|http://security.ubuntu.com/ubuntu/|http://mirrors.digitalocean.com/ubuntu/|g' /etc/apt/sources.list

# 2. Install prerequisites (curl & gnupg)
RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y curl gnupg ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# 3. Tambahkan repo NodeSource Node.js 18
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# 4. Install PHP & Node.js (Tanpa npm terpisah)
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

# 5. Selebihnya tetap sama...
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /var/www/tailadmin-laravel
WORKDIR /var/www/tailadmin-laravel

ADD . /var/www/tailadmin-laravel
ADD server.conf /etc/apache2/sites-available/
RUN a2dissite 000-default.conf && a2ensite server.conf

RUN mkdir -p bootstrap/cache storage/framework/cache storage/framework/sessions storage/framework/views && \
    chown -R www-data:www-data bootstrap storage && \
    chmod -R ug+rwx bootstrap storage

RUN npm install @popperjs/core --save

RUN chmod +x install.sh && ./install.sh

RUN chown -R www-data:www-data /var/www/tailadmin-laravel && \
    chmod -R 755 /var/www/tailadmin-laravel

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
