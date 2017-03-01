const mongoose = require('mongoose');

module.exports = mongoose.model('wish-list', {
	text: String,
	done: Boolean
});
