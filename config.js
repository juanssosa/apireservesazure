'use strict';

const dotenv = require('dotenv');
dotenv.config();

const {
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
    dbType: DB_TYPE,
    dbHost: DB_HOST,
    dbPort: parseInt(DB_PORT),
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    dbName: DB_NAME,
    autoLoadEntities: AUTO_LOAD_ENTITIES === 'true',
    synchronize: SYNCHRONIZE === 'true'
};
