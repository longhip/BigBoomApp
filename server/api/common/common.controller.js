'use strict';

var ResponseService = require.main.require('./services/response.service');
var fs = require('fs');

var CommonController = {

  uploadSingle: function(req,res){
    if(req.file){
      ResponseService.json(res,true,req.file,'MESSAGE.UPLOAD_SUCCESS');
    }else{
      ResponseService.json(res,false,'','MESSAGE.UPLOAD_FAILED');
    }
  },
  uploadMultiple: function(req,res){
    if(req.files.length > 0){
      ResponseService.json(res,true,req.files,'MESSAGE.UPLOAD_SUCCESS');
    }else{
      ResponseService.json(res,false,'','MESSAGE.UPLOAD_FAILED');
    }
  },
  removeFile: function(req,res){
    fs.unlink(req.body.path, function(err){
      if(err){
        ResponseService.json(res,false,err,'MESSAGE.DELETE_FILE_FAILED');
      }else{
        ResponseService.json(res,true,'','MESSAGE.DELETE_FILE_SUCCESS');
      }
    });
  }
};

module.exports = CommonController;

