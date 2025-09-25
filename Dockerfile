FROM node:22.19.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn next telemetry disable

COPY . .

ARG MAIL_HOST
ENV MAIL_HOST=$MAIL_HOST

ARG MAIL_PORT
ENV MAIL_PORT=$MAIL_PORT

ARG MAIL_USER
ENV MAIL_USER=$MAIL_USER

ARG MAIL_PASSWORD
ENV MAIL_PASSWORD=$MAIL_PASSWORD

ARG MAIL_FROM
ENV MAIL_FROM=$MAIL_FROM

ARG MAIL_TO
ENV MAIL_TO=$MAIL_TO

RUN yarn build

FROM node:22.19.0-alpine

WORKDIR /app

COPY --from=builder /app/public/ ./public
COPY --from=builder /app/.next/standalone/ ./
COPY --from=builder /app/.next/static/ ./.next/static

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]
