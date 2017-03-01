const addressModel = require('./model');
const { logger, cache } = require('../lib');

function get(id) {
			return addressModel.find({_id: id})
				.then((address) => {
					logger.info('Successfully got address from db');
					return address;
			})
			.catch(err => err);
}

function create(addressParams) {
	return addressModel.create(addressParams)
		.then((address) => {
			logger.info('Successfully created address');
			return address;
		})
		.catch(err => err);
}


module.exports = {
	get,
	create,
};
