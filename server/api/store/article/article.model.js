var mongoose = require('mongoose');

module.exports = mongoose.model('Store_Article', {
    name: { type: String, index:true },
    slug: { type: String },
    content: { type: String },
    description:{type: String, index:true},
    feature_image: { type: String,default:null },
    seo_title: { type: String,default:null },
    seo_description: { type: String,default:null },
    total_comment: { type: Number,default:0 },
    total_like: { type: Number,default:0 },
    total_view: { type: Number,default:0 },
    likes: [],
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
    active:Number,
    tags: [],
    photos: [],
    created_at:{type:Date,},
    updated_at:{type:Date,default:Date.now},
    created_by:{type:String, index:true},
    updated_by:{type:String, index:true},
    store_id: { type: String, index: true }
});
