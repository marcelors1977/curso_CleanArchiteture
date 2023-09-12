FROM node:12.22.8-alpine

RUN apk add bash git

RUN touch /home/node/.bashrc | echo "PS1='\u#\w$ '" >> /home/node/.bashrc

RUN npm config set cache /home/node/app/.npm-cache --global

USER node

WORKDIR /home/node/app

COPY --chown=node:node ./package.json ./

RUN npm install