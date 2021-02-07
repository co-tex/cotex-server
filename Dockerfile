FROM node:15
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN apt-get update && apt-get install -y texlive-full

CMD ["npm", "run", "build"]
COPY www ./dist/www
CMD ["npm", "run", "start"]
