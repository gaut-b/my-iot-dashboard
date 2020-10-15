FROM node:latest

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .