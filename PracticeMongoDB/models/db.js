// Create Database
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://oliveirae:passw0rd@ds259768.mlab.com:59768/eddy16042018', function(err){
  mongoose.connect('mongodb://quickhealthdb:12345678@ds161539.mlab.com:61539/quick-health', function(err) {
    if(!err) {
        console.log('Connected to mongo');
    } else {
        console.log('Failed to connect to mongo');
    }
});

require('./cafe.js');
require('./diseasewiki.js');
require('./healthfact.js');