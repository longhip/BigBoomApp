'use strict';
var express = require('express');
var app = express();

app.use('/chat', require('./api/chat'));
app.use('/auth', require('./api/auth'));
app.use('/user', require('./api/user'));
app.use('/store', require('./api/store'));
app.use('/common', require('./api/common'));


module.exports = app;

