var mongoose = require('mongoose');

module.exports = mongoose.model('Store_Posts', {
    content: { type: String },
    images: [{
        url: String,
        comments: [{
            user_id: { type: String, index: true },
            content: { type: String },
            likes: [],
            created_at: { type: Date },
            updated_at: { type: Date }
        }, ]
    }],
    likes: [],
    comments: [{
        user_id: { type: String, index: true },
        content: { type: String },
        likes: [],
        reply: [{
            user_id: { type: String, index: true },
            content: { type: String },
            created_at: { type: Date },
            updated_at: { type: Date }
        }],
    }],
    shares: [],
    type:{type:String},
    url:{type:String},
    store_id: { type: String, index: true }
});
