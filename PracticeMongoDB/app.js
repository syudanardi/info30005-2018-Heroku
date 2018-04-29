// Set up express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());



// Database Setup
require('./models/db.js');

// Routes Setup
var routes = require('./routes/routes.js');
app.use('/', routes);

// Start the server
app.listen(3000, function(req, res) {
    console.log('Listening on Port 3000');
});



