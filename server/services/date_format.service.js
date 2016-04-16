'use strict';
var moment = require('moment');

var DateFormat = {
    parseDate: function(data){
        var date = moment(data, 'DD-MM-YYYY');
        return date;
    },
    parseDateTime : function(data){
        var date = moment(data, 'DD-MM-YYYY HH:mm');
        return date;
    }
};

module.exports = DateFormat;
