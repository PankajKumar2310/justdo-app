# Fix: corrected base image tag typo (apline -> alpine) to use a valid Node image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Change: use node to run the server so the image doesn't require nodemon installed
# Compose can still override this with `command: npm run dev` for development
CMD [ "node", "server.js" ]

