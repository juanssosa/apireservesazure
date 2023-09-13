'use strict';

const { db, TableClient } = require('../db.config'); // Asegúrate de importar 'db' y 'Table' desde tu archivo db.config.js

const addClient = async (req, res, next) => {
    try {
        const data = req.body;
        const params = {
            TableName: TableClient,
            Item: data
        };
        await db.put(params).promise();
        res.send('Cliente guardado!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllClients = async (req, res, next) => {
    try {
        const params = {
            TableName: TableClient
        };
        const result = await db.scan(params).promise();
        const clientsArray = result.Items || [];
        if (clientsArray.length === 0) {
            res.status(404).send('¡No se encontraron clientes!');
        } else {
            res.send(clientsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const params = {
            TableName: TableClient,
            Key: {
                'id': parseInt(id)
            }
        };
        const result = await db.get(params).promise();
        if (!result.Item) {
            res.status(404).send('¡Cliente con el ID proporcionado no encontrado!');
        } else {
            res.send(result.Item);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const params = {
            TableName: TableClient,
            Key: {
                'id': parseInt(id)
            },
            UpdateExpression: 'SET #firstName = :firstName, #lastName = :lastName, #phone = :phone',
            ExpressionAttributeNames: {
                '#firstName': 'firstName',
                '#lastName': 'lastName',
                '#phone': 'phone'
            },
            ExpressionAttributeValues: {
                ':firstName': data.firstName,
                ':lastName': data.lastName,
                ':phone': data.phone
            }
        };
        await db.update(params).promise();
        res.send('Cliente actualizado!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const params = {
            TableName: TableClient,
            Key: {
                'id': parseInt(id)
            }
        };
        await db.delete(params).promise();
        res.send('Cliente eliminado!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addClient,
    getAllClients,
    getClient,
    updateClient,
    deleteClient
}
