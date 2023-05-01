FROM node:16.14.2

RUN \
	set -x \
	&& apt-get update \
	&& apt-get install -y python3 python3-pip

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
