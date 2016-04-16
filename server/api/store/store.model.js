var mongoose = require('mongoose');

module.exports = mongoose.model('Store', {
    store_category_id: {type:mongoose.Schema.Types.ObjectId,index:true},
    store_admin_id: {type:mongoose.Schema.Types.ObjectId,index:true},
    name: { type: String, require: true, index: true },
    email: { type: String },
    phone: { type: String },
    logo: { type: String },
    cover_image: { type: String },
    address: { type: String, index: true },
    city: { type: String, index: true },
    region: { type: Number, index: true },
    open: { type: String },
    close: { type: String },
    wifi_name: { type: String },
    wifi_pass: { type: String },
    ip: { type: String },
    feeds: [],
    likes: [],
    follows: [],
    comments: [],
    price_from: { type: Number },
    to_price: { type: Number },
    rates: [{
        user_id: {type:mongoose.Schema.Types.ObjectId,index:true},
        content: { type: String },
        star: Number
    }]

});
