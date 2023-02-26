FROM php:7.4-apache

RUN apt-get update

COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www
EXPOSE 80