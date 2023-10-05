const router = require('express').Router();
const clientModel = require('../models/client');

router.get('/clients', async (req, res) => {
    clientModel
        .getAllClients()
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.get('/clients/:id', async (req, res) => {
    const { id } = req.params;
    clientModel
        .getClient(id)
        .then(data => {
            if (data) {
                res.status(200).json({ data });
            } else {
                res.status(404).json({ error: 'No se encontró el cliente con el ID proporcionado' });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.post('/clients', async (req, res) => {
    const {
        id,
        firstName,
        lastName,
        phone,
    } = req.body;
    clientModel.addClient({
        id,
        firstName,
        lastName,
        phone,
        }).then(() => {
            res.status(200).json({ message: 'Cliente creado exitosamente' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.put('/clients/:id', async (req, res) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        phone,
    } = req.body;
    clientModel
        .updateClient({
            id,
            firstName,
            lastName,
            phone,
        })
        .then(() => {
            res.status(200).json({ message: 'Cliente actualizado exitosamente' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.delete('/clients/:id', async (req, res) => {
    const { id } = req.params;
    clientModel
        .deleteClient(id)
        .then(() => {
            res.status(200).json({ message: 'Cliente eliminado exitosamente' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

module.exports = router;