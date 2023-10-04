'use strict';

const { db, TableClient } = require('../db.config');

const addClient = async (req, res, next) => {
    try {
        const data = req.body;
        const query = `
            INSERT INTO ${TableClient} (id, firstName, lastName, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [data.firstName, data.lastName, data.phone];
        const result = await db.query(query, values);
        res.send('Cliente guardado!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllClients = async (req, res, next) => {
    try {
        const query = `SELECT * FROM ${TableClient}`;
        const result = await db.query(query);
        const clientsArray = result.rows || [];
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
        const query = `SELECT * FROM ${TableClient} WHERE id = $1`;
        const values = [id];
        const result = await db.query(query, values);
        if (result.rows.length === 0) {
            res.status(404).send('¡Cliente con el ID proporcionado no encontrado!');
        } else {
            res.send(result.rows[0]);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const query = `
            UPDATE ${TableClient}
            SET firstName = $1, lastName = $2, phone = $3
            WHERE id = $4
        `;
        const values = [data.firstName, data.lastName, data.phone, id];
        await db.query(query, values);
        res.send('Cliente actualizado!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const query = `DELETE FROM ${TableClient} WHERE id = $1`;
        const values = [id];
        await db.query(query, values);
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
};