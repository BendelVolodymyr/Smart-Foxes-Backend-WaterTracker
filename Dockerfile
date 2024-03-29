FROM node:20.12.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5050

CMD [ "node", "app" ]