'use strict';

const dotenv = require('dotenv');
dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME

} = process.env;

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    dbHost: DB_HOST,
    dbPort: parseInt(DB_PORT),
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    dbName: DB_NAME
};
