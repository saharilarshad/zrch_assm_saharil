FROM node:20.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
# CMD ["npm", "run", "start:prod"]

# docker build -t nestjs-app .
# docker run -p 3001:3001 nestjs-app


