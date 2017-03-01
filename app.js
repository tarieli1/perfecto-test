'use strict';

const express  = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const config = require('./lib/config');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || config.port;

mongoose.connect(config.db.url);

/*
 * Cross middlewars
 */
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
    logger.info(`App listening on port ${port}`);
});
