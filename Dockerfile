FROM node:8 as builder

WORKDIR /src

COPY package*.json /src/

RUN npm install

COPY ./ /src/

EXPOSE 4200

CMD ["npm","start"]
