var mongoose = require('mongoose');

module.exports = mongoose.model('Store_Food', {
    sku: { type:String, index: true},
    name: { type: String, index:true },
    slug: { type: String },
    menu_id: {type:mongoose.Schema.Types.ObjectId,index:true},
    content: { type: String },
    description:{type: String, index:true, default: null},
    price_real: {type: Number, index:true},
    price: {type: Number, index:true},
    feature_image: { type: String,default:null },
    galleries: [],
    seo_title: { type: String,default:null },
    seo_description: { type: String,default:null },
    total_comment: { type: Number,default:0 },
    total_like: { type: Number,default:0 },
    total_wishlist: { type: Number,default:0 },
    total_view: { type: Number,default:0 },
    total_sale: { type: Number,default:0 },
    likes: [],
    sales: [],
    wishlist:[],
    comments: [{
        user_id: {type:mongoose.Schema.Types.ObjectId,index:true},
        father_id: {type:mongoose.Schema.Types.ObjectId,index:true,default:null},
        content: { type: String },
        likes: [],
        total_like:{ type: Number,default:0 },
        total_replied:{ type: Number,default:0},
        created_at:{type:Date},
        updated_at:{type:Date,default:Date.now}
    }],
    status: {type: Number, default: 1},
    active:{type: Number, default: 1},
    tags:[],
    photos: [],
    created_at:{type:Date},
    updated_at:{type:Date,default:Date.now},
    created_by:{type:String, index:true},
    updated_by:{type:String, index:true},
    store_id: { type: String, index: true }
});
	