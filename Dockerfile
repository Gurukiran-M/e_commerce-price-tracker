FROM node:23-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install
RUN apk add chromium

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]
