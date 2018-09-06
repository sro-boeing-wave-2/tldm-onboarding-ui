##STAGE 1 : Build Angular Application##
FROM node:8 as builder

COPY

WORKDIR

RUN npm install
RUN $(npm bin)/ng build


##STAGE 2 : Run nginx to serve application##
FROM nginx

COPY

EXPOSE 80
