FROM node:22

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .

ENV PORT=8081

EXPOSE 8081

CMD ["yarn", "start"]