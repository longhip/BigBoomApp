var mongoose = require('mongoose');

var CreateObjectIdService = {
	generate: function (id) {
		return new mongoose.Types.ObjectId(id);
	}
}

module.exports = CreateObjectIdService;