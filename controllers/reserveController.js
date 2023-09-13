'use strict';

const { db, TableReserve } = require('../db.config'); // Asegúrate de importar 'db' y 'Table' desde tu archivo db.config.js

const addReserve = async (req, res, next) => {
    try {
        const data = req.body;
        const params = {
            TableName: TableReserve,
            Item: data
        };
        await db.put(params).promise();
        res.send('Reserva guardada!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllReserves = async (req, res, next) => {
    try {
        const params = {
            TableName: TableReserve
        };
        const result = await db.scan(params).promise();
        const reservesArray = result.Items || [];
        if (reservesArray.length === 0) {
            res.status(404).send('¡No se encontraron reservas!');
        } else {
            res.send(reservesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getReserve = async (req, res, next) => {
    try {
        const id = req.params.id;
        const params = {
            TableName: TableReserve,
            Key: {
                'id': parseInt(id)
            }
        };
        const result = await db.get(params).promise();
        if (!result.Item) {
            res.status(404).send('Reserva con el ID proporcionado no encontrado!');
        } else {
            res.send(result.Item);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateReserve = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const params = {
            TableName: TableReserve,
            Key: {
                'id': parseInt(id)
            },
            UpdateExpression: 'SET #dtIni = :dtIni, #dtFin = :dtFin, #hrIni = :hrIni, #hrFin = :hrFin, #clRelated = :clRelated, #reserveState = :reserveState',
            ExpressionAttributeNames: {
                '#dtIni' : 'dtIni', 
                '#dtFin' : 'dtFin', 
                '#hrIni' : 'hrIni', 
                '#hrFin' : 'hrFin', 
                '#clRelated' : 'clRelated', 
                '#reserveState' : 'reserveState'
            },
            ExpressionAttributeValues: {
                ':dtIni': data.dtIni,
                ':dtFin': data.dtFin,
                ':hrIni': data.hrIni,
                ':hrFin': data.hrFin,
                ':clRelated': data.clRelated,
                ':reserveState': data.reserveState
            }
        };
        await db.update(params).promise();
        res.send('Reserva actualizado!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteReserve = async (req, res, next) => {
    try {
        const id = req.params.id;
        const params = {
            TableName: TableReserve,
            Key: {
                'id': parseInt(id)
            }
        };
        await db.delete(params).promise();
        res.send('Reserva eliminado!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addReserve,
    getAllReserves,
    getReserve,
    updateReserve,
    deleteReserve
}