const mongoose = require('mongoose');

module.exports = mongoose.model('user', {
	text: String,
	done: Boolean
});
