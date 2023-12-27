FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install

CMD ["sh", "-c", "npm run populate && npm run start:dev"]
