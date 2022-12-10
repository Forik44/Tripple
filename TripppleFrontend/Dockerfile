FROM node:alpine

WORKDIR /web_django/client

COPY package.json .

RUN npm install

COPY . .
RUN npm run build
