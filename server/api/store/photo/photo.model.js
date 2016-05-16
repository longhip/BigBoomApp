var mongoose = require('mongoose');

module.exports = mongoose.model('Store_Photo', {
    name: { type: String, index: true },
    path: { type: String },
    album_id: { type: mongoose.Schema.Types.ObjectId, index: true, default: null },
    from: {
        f_id: { type: mongoose.Schema.Types.ObjectId, index: true, default: null },
        f_type: { type: String, index: true }
    },
    description: { type: String, default:null},
    total_comment: { type: Number, default: 0 },
    total_like: { type: Number, default: 0 },
    likes: [],
    comments: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, index: true },
        father_id: { type: mongoose.Schema.Types.ObjectId, index: true, default: null },
        content: { type: String },
        likes: [],
        total_like: { type: Number, default: 0 },
        total_replied: { type: Number, default: 0 },
        created_at: { type: Date },
        updated_at: { type: Date, default: Date.now }
    }],
    deleted: { type: Number, default: 0 },
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
    created_by: { type: mongoose.Schema.Types.ObjectId, index: true },
    updated_by: { type: mongoose.Schema.Types.ObjectId, index: true },
    store_id: { type: mongoose.Schema.Types.ObjectId, index: true },

});
