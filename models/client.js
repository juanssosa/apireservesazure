const execQuery = require('./../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const addClient = (clientData) => {
    const {
        id,
        firstName,
        lastName,
        phone,
    } = clientData;

    const query = `
        INSERT INTO [dbo].[clients] (id, firstName, lastName, phone)
        VALUES (@id, @firstName, @lastName, @phone)
    `;

    const parameters = [
        { name: 'id', type: TYPES.Int, value: id },
        { name: 'firstName', type: TYPES.NVarChar, value: firstName },
        { name: 'lastName', type: TYPES.NVarChar, value: lastName },
        { name: 'phone', type: TYPES.NVarChar, value: phone },
    ];

    return execQuery.execWriteCommand(query, parameters);
};

const getAllClients = () => {
    const query = `
        SELECT * FROM [dbo].[clients]
    `;

    return execQuery.execReadCommand(query);
};

const getClient = (id) => {
    const query = `
        SELECT * FROM [dbo].[clients]
        WHERE id = @id
    `;

    const parameters = [
        { name: 'id', type: TYPES.Int, value: id },
    ];

    return execQuery.execReadCommand(query, parameters);
};

const updateClient = (clientData) => {
    const {
        id,
        firstName,
        lastName,
        phone,
    } = clientData;

    const query = `
        UPDATE [dbo].[clients]
        SET firstName = @firstName, lastName = @lastName, phone = @phone
        WHERE id = @id
    `;

    const parameters = [
        { name: 'id', type: TYPES.Int, value: id },
        { name: 'firstName', type: TYPES.NVarChar, value: firstName },
        { name: 'lastName', type: TYPES.NVarChar, value: lastName },
        { name: 'phone', type: TYPES.NVarChar, value: phone },
    ];

    return execQuery.execWriteCommand(query, parameters);
};

const deleteClient = (id) => {
    const query = `
        DELETE FROM [dbo].[clients]
        WHERE id = @id
    `;

    const parameters = [
        { name: 'id', type: TYPES.Int, value: id },
    ];

    return execQuery.execWriteCommand(query, parameters);
};

module.exports = {
    addClient,
    getAllClients,
    getClient,
    updateClient,
    deleteClient
};