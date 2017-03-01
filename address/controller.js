const promise = require("bluebird");

const addressModel = require('./model');
const { logger, cache } = require('../lib');

const cacheGet = promise.promisify(cache.get, {context: cache});
const cacheSet = promise.promisify(cache.set, {context: cache});

function get(id) {
	cacheGet(id)
		.then((value) => {
			logger.info('got data from cache');
			return value;
		})
		.catch((err) => {
			return addressModel.find({_id: id})
				.then((address) => {
					logger.info('Successfully got address from db');
					cacheSet(id, address)
						.then((res) => {
							logger.info('Successfully insert to cache');
							return address;
						})
						.catch(err => err);
			})
			.catch(err => err);
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
