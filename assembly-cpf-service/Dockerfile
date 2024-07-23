FROM node:20.14.0-slim as build

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run build

EXPOSE 3001

CMD [ "npm", "start" ]
