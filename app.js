const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const addressRoute = require('./address');
const { logger, config } = require('./lib');

const app = express();
const port = process.env.PORT || config.port;

/*
 * Cross middlewars
 */
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/addresses', addressRoute);

mongoose.connect(config.db.url, (err) => {
	if (err) {
		logger.info('Cannot connect to mongoDB');
	} else {
		logger.info('Successfully connected to mongoDB');
	}
});

app.listen(port, () => {
	logger.info(`App listening on port ${port}`);
});
