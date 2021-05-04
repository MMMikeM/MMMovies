FROM node:15-alpine
RUN npm i -g npm@7.11.2
ENV PORT 8080
RUN mkdir /usr/src
COPY . /usr/src
WORKDIR /usr/src
RUN npm install -g node-dev
RUN npm install
