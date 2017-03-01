const addressModel = require('./model');
const {logger} = require('../lib');
const cache = require('../lib/cache');


function get(id) {
	cache.get(id, function( err, value ){
		  if( err ){
    		return addressModel.find({_id: id})
			.then((address) => {
			logger.info('Successfully got address from db');
			cache.set(id, address, function( err, success ){
  				if( !err && success ){
    				logger.info('Successfully cached')
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
