// Create Database
var mongoose = require('mongoose');

mongoose.connect('mongodb://oliveirae:passw0rd@ds259768.mlab.com:59768/eddy16042018', function(err){
    if(!err) {
        console.log('Connected to mongo');
    } else {
        console.log('Failed to connect to mongo');
    }
});

require('./cafe.js');
