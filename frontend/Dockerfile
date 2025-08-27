# Fix: upgrade Node image to meet engines (Vite 7 requires ^20.19 or >=22.12)
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Add: expose Vite dev server port for container networking
EXPOSE 5173



