'use strict';

const dotenv = require('dotenv');
dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    AUTO_LOAD_ENTITIES,
    SYNCHRONIZE
} = process.env;

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    dbType: DB_TYPE,
    dbHost: DB_HOST,
    dbPort: parseInt(DB_PORT),
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    dbName: DB_NAME,
    autoLoadEntities: AUTO_LOAD_ENTITIES === 'true',
    synchronize: SYNCHRONIZE === 'true'
};
