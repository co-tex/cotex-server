FROM node:15

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y texlive-full \
    && rm -rf /var/lib/apt/lists/* 

COPY package*.json ./

RUN npm install

COPY . .

COPY www ./dist/www

CMD ["npm", "start"]