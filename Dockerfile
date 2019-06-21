FROM node:8.6 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/

RUN $(npm bin)/ng build -prod -aot false

FROM nginx:1.13
RUN apk update \
    && apk add openssl
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./certs/ecomundo-certs.crt /etc/ssl/certs
COPY ./certs/ecomundo-key.key /etc/ssl/private