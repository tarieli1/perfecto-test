const Joi = require('joi');

module.exports = {
	address: {
		create: {
			body: {
				altitude: Joi.number().required(),
				longitude: Joi.number().required(),
				address: Joi.string().required(),
			},
		},
	},
};