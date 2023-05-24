# syntax=docker/dockerfile:1

FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "yarn.lock*", "./"]

RUN yarn

RUN yarn build

COPY ["package.json", "yarn.lock*", "output/", "files/", "./"]

CMD ["node", "output/index.js"]