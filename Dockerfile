FROM node:18.17.1-bullseye

WORKDIR /app-ApiReserveAzure

COPY package*.json ./

RUN npm install 

RUN npm run azure 

COPY . .

EXPOSE 3000

CMD ["npm","start"]
