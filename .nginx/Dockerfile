FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./.nginx/conf.d /etc/nginx/conf.d
COPY ./.nginx/cert /cert

EXPOSE 80
EXPOSE 443