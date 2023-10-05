'use strict';
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const config = require('./config');
const clientController = require('./controllers/clientController');
const reserveController = require('./controllers/reserveController');

const app = express();
 
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//app.use('/api', clientRoutes.routes);
//app.use('/api', reserveRoutes.routes);

app.use('/api', clientController);
app.use('/api', reserveController);

app.listen(config.port, () => console.log('Running on port '+config.port));
