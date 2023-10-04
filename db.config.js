const { Pool } = require('pg');
const config = require('./config');

const db = new Pool({
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbName,
    user: config.dbUser,
    password: config.dbPassword
});

const TableClient = 'clients'; // Nombre de la tabla en 
const TableReserve = 'reserves';

module.exports = {
    db,
    TableClient,
    TableReserve
};
