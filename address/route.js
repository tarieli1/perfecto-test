const express = require('express');
const validate = require('express-validation');

const logger = require('../lib');
const { validation } = require('../helpers');
const controller = require('./controller');

const router = express.Router();


router
	
	.get('/:id', (req, res) => {
		const id = req.params.id;
		controller.find(id)
			.then(data => res.json(data))
			.catch((err) => {
				logger.error(`Error occurred while getting address with address ${id}`, err);
				return res.status(500).send(err);
			});
	})
	.post('/', validate(validation.address.create), (req, res) => {
		controller.create(req.body)
			.then(data => res.json(data))
			.catch((err) => {
				logger.error('Error occurred while creating address', err);
				return res.status(500).send(err);
			});
	})

module.exports = router;
