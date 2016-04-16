var mongoose = require('mongoose');

module.exports = mongoose.model('Store_Menu', {
    name: { type: String, index:true },
    slug: { type: String },
    content: { type: String },
    father_id: {type: mongoose.Schema.Types.ObjectId, index:true, default:null},
    description:{type: String, index:true},
    total_food: { type: Number, default:0},
    active: { type: Number, default:1 },
    created_at:{type:Date},
    updated_at:{type:Date,default:Date.now},
    created_by:{type:String, index:true},
    updated_by:{type:String, index:true},
    store_id: { type: String, index: true }
});
	