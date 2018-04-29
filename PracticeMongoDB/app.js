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

// var cafes = [
//     {
//         "name": "Cafe A",
//         "address": "Richmond",
//         "distance": "6.2 km",
//         "rating": "4.0",
//         "photo": "https://source.unsplash.com/O50HtSlCzag/"
//     },
//     {
//         "name": "Cafe B",
//         "address": "Fitzroy",
//         "distance": "1.9 km",
//         "rating": "4.4",
//         "photo": "https://source.unsplash.com/O50HtSlCzag/"
//     },
//     {
//         "name": "Cafe C",
//         "address": "Collingwood",
//         "distance": "2.7 km",
//         "rating": "4.3",
//         "photo": "https://source.unsplash.com/O50HtSlCzag/"
//     },
//     {
//         "name": "Cafe D",
//         "address": "Melbourne CBD",
//         "distance": "2.2 km",
//         "rating": "3.2",
//         "photo": "https://source.unsplash.com/O50HtSlCzag/"
//     },
// ];

// app.get('/api', function(req, res) {
//     res.send(cafes);
// });

// app.get('api/:id', function(req,res) {
//     res.send(cafes[req.params.id]);
// });

// app.post('/api', function(req,res) {
//     var newcafe = {
//         "name": req.body.name,
//         "address": req.body.address,
//         "distance": req.body.distance,
//         "rating": req.body.rating,
//         "photo": req.body.photo
//     };
//     cafes.push(newcafe);
//     res.send(newcafe);
// });



// Start the server
app.listen(3000, function(req, res) {
    console.log('Listening on Port 3000');
});



