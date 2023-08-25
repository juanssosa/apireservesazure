'use strict';

const { db } = require('../firebase.js')
const Reserve = require('../models/reserve.js');
//const firestore = firebase.firestore();

const addReserve = async(req,res,next) => {
    try{
        const data = req.body;
        await db.collection('reserves').doc().set(data);
        res.send('Reserve saved!')
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const getAllReserves = async (req, res, next) => {
    try {
        const reserves = await db.collection('reserves');
        const data = await reserves.get();
        const reservesArray = [];
        if(data.empty) {
            res.status(404).send('No reserve found!');
        }else {
            data.forEach(doc => {
                const reserve = new Reserve(
                    doc.id,
                    doc.data().dtIni,
                    doc.data().dtFin,
                    doc.data().hrIni,
                    doc.data().hrFin,
                    doc.data().clRelated,
                    doc.data().reserveState
                );
                reservesArray.push(reserve);
            });
            res.send(reservesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getReserve = async (req, res, next) => {
    try {
        const id = req.params.id;
        const reserve = await db.collection('reserves').doc(id);
        const data = await reserve.get();
        if(!data.exists) {
            res.status(404).send('Reserve with the given ID has not been found!');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateReserve = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const reserve =  await db.collection('reserves').doc(id);
        await reserve.update(data);
        res.send('Reserve updated!');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteReserve = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('reserves').doc(id).delete();
        res.send('Reserve deleted!');
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