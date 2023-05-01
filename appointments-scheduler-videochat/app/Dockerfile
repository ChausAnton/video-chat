FROM node:16.14.2
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . /home/node/app
CMD [ "npm", "run", "start" ]
