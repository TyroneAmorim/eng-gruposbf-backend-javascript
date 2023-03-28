FROM node:18.15.0
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .