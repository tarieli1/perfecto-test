const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = mongoose.model('address', {
	altitude: Number,
	longitude: Number,
	address: String,
});
