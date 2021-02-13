FROM node:15

RUN apt-get update && apt-get install -y texlive-full  \
    && rm -rf /var/lib/apt/lists/*
    
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY www ./dist/www
