FROM node:18.17.1-bullseye

WORKDIR /app-ApiReserve

COPY . .

RUN npm install 

EXPOSE 3000

CMD ["npm","start"]

