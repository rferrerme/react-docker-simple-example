FROM ubuntu:14.04
RUN apt-get update && apt-get install -y wget
RUN wget http://nginx.org/keys/nginx_signing.key
RUN apt-key add nginx_signing.key
RUN echo "deb http://nginx.org/packages/ubuntu/ trusty nginx" >> /etc/apt/sources.list
RUN echo "deb-src http://nginx.org/packages/ubuntu/ trusty nginx" >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y nginx
ADD run.sh /
CMD ["bash", "/run.sh"]