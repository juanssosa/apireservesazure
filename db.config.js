const AWS = require('aws-sdk')
const config = require('./config')

AWS.config.update({
    region: "us-east-1",
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretKey
})

const db = new AWS.DynamoDB.DocumentClient()

const TableClient = 'clients'
const TableReserve = 'reserves'

module.exports = {
    db,
    TableClient,
    TableReserve
}