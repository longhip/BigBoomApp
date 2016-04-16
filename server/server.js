'use strict';
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./routes');
var config = require('./config/express');
var cors = require('cors');
var expressValidator = require('express-validator');
var ChatSocket = require('./api/chat/chat.socket');


var io = require('socket.io').listen(http);
var chat = io.of('/chat');
chat.on('connection', function(socket) {
    ChatSocket.respond(socket, chat);
});

mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/public',express.static('public'));

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        if (config.environment == 'develop') {
            var namespace = param.split('.');
            var root = namespace.shift();
            var formParam = root;
            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
        if (config.environment == 'production') {
            return {
                msg: 'MESSAGE.VALIDATOR_FAILED',
            };
        }
    }
}));

app.use(cors());

var port = process.env.PORT || 1337;

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.use('/api/v1', router);


http.listen(port, function() {
    console.log('App listening in localhost:1337...');
});
