const express = require('express');
const {addClient, 
    getAllClients, 
    getClient, 
    updateClient, 
    deleteClient} = require('../controllers/clientController');

const router = express.Router();

router.post('/client', addClient);
router.get('/clients', getAllClients);
router.get('/client/:id', getClient);
router.put('/client/:id', updateClient);
router.delete('/client/:id', deleteClient);

module.exports = {
    routes: router
}