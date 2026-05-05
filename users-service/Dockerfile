#########################
### Development image ###
#########################

# Base image
FROM php:8.4-apache AS development

# Install system dependencies and PHP extensions required for Laravel + MySQL/PostgreSQL support
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    unzip \
    libpq-dev \
    libonig-dev \
    libssl-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    intl \
    zip \
    bcmath \
    soap \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the project files to the server folder
COPY . /var/www/html

# Install Composer and dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer install --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist

# Install Laravel dependencies
RUN composer install

# Run database migrations
RUN php artisan migrate --force

# Clear and cache configuration
RUN php artisan config:cache
RUN php artisan route:cache

# Configure the virtual host settings for Apache
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

# Give the web server permission to read and write to the app files/directories
RUN chown -R www-data:www-data /var/www/html

# Sets the ServerName so Apache doesn’t have to guess it
RUN echo "ServerName localhost:80" >> /etc/apache2/apache2.conf

# Run Apache in the foreground
CMD ["apache2ctl", "-D", "FOREGROUND"]