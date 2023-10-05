const router = require('express').Router();
const reserveModel = require('../models/reserve');

router.get('/reserves', async (req, res) => {
    reserveModel
        .getAllReserves()
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.get('/reserves/:id', async (req, res) => {
    const { id } = req.params;
    reserveModel
        .getReserve(id)
        .then(data => {
            if (data) {
                res.status(200).json({ data });
            } else {
                res.status(404).json({ error: 'No se encontró la reserva con el ID proporcionado' });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.post('/reserves', async (req, res) => {
    const {
        id, 
        dtIni, 
        dtFin,
        hrIni, 
        hrFin, 
        clRelated, 
        reserveState
    } = req.body;
    reserveModel.addReserve({
        id, 
        dtIni, 
        dtFin,
        hrIni, 
        hrFin, 
        clRelated, 
        reserveState
        }).then(() => {
            res.status(200).json({ message: 'Reserva creada exitosamente' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.put('/reserves/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        dtIni, 
        dtFin,
        hrIni, 
        hrFin, 
        clRelated, 
        reserveState
    } = req.body;
    reserveModel
        .updateReserve({
            id,
            dtIni, 
            dtFin,
            hrIni, 
            hrFin, 
            clRelated, 
            reserveState
        })
        .then(() => {
            res.status(200).json({ message: 'Reserva actualizada exitosamente' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.delete('/reserves/:id', async (req, res) => {
    const { id } = req.params;
    reserveModel
        .deleteReserve(id)
        .then(() => {
            res.status(200).json({ message: 'Reserva eliminada exitosamente' });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

module.exports = router;