const mongoose = require('mongoose');

module.exports = mongoose.model('product', {
	text: String,
	done: Boolean
});
