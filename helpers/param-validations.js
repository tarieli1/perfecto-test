const Joi = require('joi');

module.exports = {
	address: {
		create: {
			body: {
				address: Joi.string().required(),
			},
		},
		get: {
			params: {
				id: Joi.string().required(),
			},
		},
	},
};
