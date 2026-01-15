FROM ubuntu:22.04

RUN apt update -y && apt install -y curl && \
    DEBIAN_FRONTEND=noninteractive apt install -y apache2 \
    php \
    npm \
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

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
