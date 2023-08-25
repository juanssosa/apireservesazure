'use strict';
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const config = require('./config');
const clientRoutes = require('./routes/client-routes');
const reserveRoutes = require('./routes/reserve-routes');

const app = express();
 
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', clientRoutes.routes);
app.use('/api', reserveRoutes.routes);


app.listen(config.port, () => console.log('Running on port '+config.port));
