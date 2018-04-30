// Create Database
var mongoose = require('mongoose');

mongoose.connect('mongodb://quickhealthdb:12345678@ds161539.mlab.com:61539/quick-health', function(err){
    if(!err) {
        console.log('Connected to mongo');
    } else {
        console.log('Failed to connect to mongo');
    }
});

require('./disease.js');
require('./user.js');
require('./healthfact.js');