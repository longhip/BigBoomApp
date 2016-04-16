'use strict';
var jwt = require('jsonwebtoken');
var config = require.main.require('./config/express');
module.exports.handle = function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' },401);
      } else {
        req.decoded = decoded;
        req.auth = decoded._doc;
        next();
      }
    });
  } else {
    return res.status(401).send({
        success: false,
        message: 'No token provided.'
    });
  }
};
