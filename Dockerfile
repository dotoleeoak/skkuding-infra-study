FROM node:20-alpine

COPY . /app
WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "/app/server.js"]
