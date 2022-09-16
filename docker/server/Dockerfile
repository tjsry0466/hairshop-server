FROM node:14-alpine

RUN apk add --no-cache tzdata

ENV TZ="Asia/Seoul"

WORKDIR /var/www/html
COPY . /var/www/html

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3200

CMD ["yarn", "start"]
