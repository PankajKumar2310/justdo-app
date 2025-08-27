FROM node:18-apline

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

