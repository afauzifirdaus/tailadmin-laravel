FROM ubuntu:22.04

RUN sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list && \
    sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

RUN apt update -y && apt install -y curl && \
    DEBIAN_FRONTEND=noninteractive apt install -y apache2 \
    php \
    nodejs \
    php-xml \
    php-mbstring \
    php-curl \
    php-mysql \
    php-gd \
    unzip \
    nano  \
    curl && \
    rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /var/www/tailadmin-laravel
WORKDIR /var/www/tailadmin-laravel

ADD . /var/www/tailadmin-laravel
ADD server.conf /etc/apache2/sites-available/

RUN a2dissite 000-default.conf && a2ensite server.conf

RUN mkdir -p bootstrap/cache \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views && \
    chown -R www-data:www-data bootstrap storage && \
    chmod -R ug+rwx bootstrap storage

RUN chmod +x install.sh && ./install.sh

RUN chown -R www-data:www-data /var/www/tailadmin-laravel && \
    chmod -R 755 /var/www/tailadmin-laravel

EXPOSE 8090
CMD php artisan serve --host=0.0.0.0 --port=8090
