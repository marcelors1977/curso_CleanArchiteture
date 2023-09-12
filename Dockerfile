# FROM node:12-alpine3.15
FROM node:12.22.8-alpine

RUN apk add bash git

RUN touch /home/node/.bashrc | echo "PS1='\u#\w$ '" >> /home/node/.bashrc

RUN wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  chmod +x /usr/bin/wait-for

RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm install

USER node

WORKDIR /home/node/app