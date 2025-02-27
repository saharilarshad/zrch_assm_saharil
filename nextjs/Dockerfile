FROM node:18-alpine

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . /usr/src

RUN npm run build

EXPOSE 3000

CMD npm run start