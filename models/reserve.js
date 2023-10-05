const execQuery = require('./../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const addReserve = (reserveData) => {
    const {
        id, 
        dtIni, 
        dtFin,
        hrIni, 
        hrFin, 
        clRelated, 
        reserveState
    } = reserveData;

    const query = `
        INSERT INTO [dbo].[reserves] (id, dtIni, dtFin, hrIni, hrFin, clRelated, reserveState)
        VALUES (@id, @dtIni, @dtFin, @hrIni, @hrFin, @clRelated, @reserveState)
    `;

    const parameters = [
        { name: 'id', type: TYPES.Int, value: id },
        { name: 'dtIni', type: TYPES.NVarChar, value: dtIni },
        { name: 'dtFin', type: TYPES.NVarChar, value: dtFin },
        { name: 'hrIni', type: TYPES.NVarChar, value: hrIni },
        { name: 'hrFin', type: TYPES.NVarChar, value: hrFin },
        { name: 'clRelated', type: TYPES.Int, value: clRelated },
        { name: 'reserveState', type: TYPES.NVarChar, value: reserveState }
    ];

    return execQuery.execWriteCommand(query, parameters);
};

const getAllReserves = () => {
    const query = `
        SELECT * FROM [dbo].[reserves]
    `;

    return execQuery.execReadCommand(query);
};

const getReserve = (id) => {
    const query = `
        SELECT * FROM [dbo].[reserves]
        WHERE id = @id
    `;

    const parameters = [
        { name: 'id', type: TYPES.Int, value: id },
    ];

    return execQuery.execReadCommand(query, parameters);
};

const updateReserve = (reserveData) => {
    const {
        id, 
        dtIni, 
        dtFin,
        hrIni, 
        hrFin, 
        clRelated, 
        reserveState
    } = reserveData;

    const query = `
        UPDATE [dbo].[reserves]
        SET dtIni = @dtIni, dtFin = @dtFin, hrIni = @hrIni, hrFin = @hrFin, clRelated = @clRelated, reserveState = @reserveState
        WHERE id = @id
    `;

    const parameters = [
        { name: 'id', type: TYPES.Int, value: id },
        { name: 'dtIni', type: TYPES.NVarChar, value: dtIni },
        { name: 'dtFin', type: TYPES.NVarChar, value: dtFin },
        { name: 'hrIni', type: TYPES.NVarChar, value: hrIni },
        { name: 'hrFin', type: TYPES.NVarChar, value: hrFin },
        { name: 'clRelated', type: TYPES.Int, value: clRelated },
        { name: 'reserveState', type: TYPES.NVarChar, value: reserveState }
    ];

    return execQuery.execWriteCommand(query, parameters);
};

const deleteReserve = (id) => {
    const query = `
        DELETE FROM [dbo].[reserves]
        WHERE id = @id
    `;

    const parameters = [
        { name: 'id', type: TYPES.Int, value: id },
    ];

    return execQuery.execWriteCommand(query, parameters);
};

module.exports = {
    addReserve,
    getAllReserves,
    getReserve,
    updateReserve,
    deleteReserve
};