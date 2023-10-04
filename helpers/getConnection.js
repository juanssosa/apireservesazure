const Connection = require('tedious').Connection;
const dotenv = require('dotenv');

dotenv.config();

const {
    DB_HOST,
    DB_AUTH_TYPE,
    DB_USER,
    DB_PASSWORD,
    DB_NAME

} = process.env;

const configConnection = {
    server: DB_HOST ,
    authentication: {
        type: DB_AUTH_TYPE,
        options: {
            userName: DB_USER,
            password: DB_PASSWORD,
        },
    },
    options: {
        encrypt: true,
        database: DB_NAME,
        rowCollectionOnDone: true,
    },
};

const getConnection = () => {
    const connect = () => new Promise((resolve, reject) => {
        const connectionInstance = new Connection(configConnection);
        connectionInstance.on('connect', (error) => {
            if(!error) {
                resolve(connectionInstance);
            }
            else {
                reject(error);
            }
        });

        connectionInstance.connect();
    });

    return {connect};
};

module.exports = getConnection;