const express = require('express');
const {addReserve,
    getAllReserves,
    getReserve,
    updateReserve,
    deleteReserve} = require('../controllers/reserveController');

const router = express.Router();

router.post('/reserve', addReserve);
router.get('/reserves', getAllReserves);
router.get('/reserve/:id', getReserve);
router.put('/reserve/:id', updateReserve);
router.delete('/reserve/:id', deleteReserve);

module.exports = {
    routes: router
}