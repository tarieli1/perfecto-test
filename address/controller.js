const addressModel = require('./model');
const { logger, cache } = require('../lib');

function get(id) {
	cache.get(id, function(err, value){
		  if (err) {
			return addressModel.find({_id: id})
				.then((address) => {
					logger.info('Successfully got address from db');
					cache.set(id, address, function(err, success) {
						if (!err && success) {
							logger.info('Successfully insert to cache');
						}
					});
					return address;
			})
			.catch(err => err);
		}
		else {
			logger.info('retreived from cache')
			return value;
		}
	});
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
