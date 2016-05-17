var mongoose = require('mongoose');

module.exports = mongoose.model('Store_Album', {
	name 			: {type: String},
	description 	: {type: String, default: null},
	created_at 		: {type: Date},
	updated_at		: {type: Date},
	deleted 		: {type: Number, default: 0},
	created_by		: { type: mongoose.Schema.Types.ObjectId, index: true },
    updated_by		: { type: mongoose.Schema.Types.ObjectId, index: true },
    store_id		: { type: mongoose.Schema.Types.ObjectId, index: true }
});