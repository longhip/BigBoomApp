var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
  name: {
    firstname:{type:String, index:true},
    lastname:{type:String, index:true}
  },
  email: {type: String, index:true},
  password:String,
  avatar:String,
  phone:String,
  address:String,
  permissions:[],
  gender:Number,
  active:Number,
  status:Number,
  role_id:{type:Number, index:true},
  feeds:[],
  friends:[],
  store_likes:[],
  store_follows:[],
  type:{type:Number, index:true},
  created_by:{type:mongoose.Schema.Types.ObjectId,index:true},
  updated_by:{type:mongoose.Schema.Types.ObjectId,index:true},
  created_at:{type: Date},
  updated_at:{type: Date},
  store_id:{type:mongoose.Schema.Types.ObjectId,index:true}
});
