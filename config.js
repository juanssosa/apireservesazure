'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is reqwuired');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    awsAccessKey: AWS_ACCESS_KEY_ID,
    awsSecretKey: AWS_SECRET_ACCESS_KEY
}