FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY index.html ./
COPY src ./src
COPY public ./public
COPY tsc ./tsc
COPY vite.config.ts ./

EXPOSE 5173

CMD ["npm", "run", "dev"]
