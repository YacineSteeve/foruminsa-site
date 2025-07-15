FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/public/ ./public
COPY --from=build /app/.next/standalone/ ./
COPY --from=build /app/.next/static/ ./.next/static

ENTRYPOINT ["node", "server.js"]
