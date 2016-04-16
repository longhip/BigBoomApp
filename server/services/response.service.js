'use strict';
var ResponseService = {
  json: function(res,status,data,message){
    res.json({
      status:status,
      data:data,
      message:message
    });
  }
};
module.exports = ResponseService;
