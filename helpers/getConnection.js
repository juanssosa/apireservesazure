const Connection = require('tedious').Connection;
const dotenv = require('dotenv');

dotenv.config({ path: '.azure.env' });

const {
    AZURE_SQL_DB,
    AZURE_SQL_HOST,
    AZURE_SQL_USER,
    AZURE_SQL_PASSWORD,
} = process.env;

console.log(AZURE_SQL_DB)

const configConnection = {
    server: AZURE_SQL_HOST ,
    authentication: {
        type: 'default',
        options: {
            userName: AZURE_SQL_USER,
            password: AZURE_SQL_PASSWORD,
        },
    },
    options: {
        encrypt: true,
        database: AZURE_SQL_DB,
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