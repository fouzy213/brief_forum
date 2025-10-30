FROM node:23-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

EXPOSE 3002

CMD ["npm", "run", "dev"]