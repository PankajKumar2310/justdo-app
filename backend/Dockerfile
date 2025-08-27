FROM node:18-apline

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "nodemon","server.js" ]

