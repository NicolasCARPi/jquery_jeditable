FROM php:7.2.1-apache-stretch
COPY . /var/www/html
RUN ln -s /var/www/html/src /var/www/html/demos/src
RUN sed -i -e "s:/var/www/html:/var/www/html/demos:" /etc/apache2/sites-enabled/000-default.conf
