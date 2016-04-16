'use strict';
var Store = require('../api/admin/store/store.model');
var StoreService = {
  getStore : function(store_id){
    Store.findOne({_id: store_id},function(err,store){
      if(err) {
        return {};
      }
      if(store) {
        return store;
      }
    });
  }
};

module.exports = StoreService;
