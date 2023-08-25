'use strict';

const { db } = require('../firebase.js')
const Client = require('../models/client');
//const firestore = firebase.firestore();

const addClient = async(req,res,next) => {
    try{
        const data = req.body;
        await db.collection('clients').doc().set(data);
        res.send('Record saved!')
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const getAllClients = async (req, res, next) => {
    try {
        const clients = await db.collection('clients');
        const data = await clients.get();
        const clientsArray = [];
        if(data.empty) {
            res.status(404).send('No client found');
        }else {
            data.forEach(doc => {
                const client = new Client(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().phone
                );
                clientsArray.push(client);
            });
            res.send(clientsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const client = await db.collection('clients').doc(id);
        const data = await client.get();
        if(!data.exists) {
            res.status(404).send('Client with the given ID has not been found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const client =  await db.collection('clients').doc(id);
        await client.update(data);
        res.send('Client updated!');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteClient = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('clients').doc(id).delete();
        res.send('Client deleted');
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