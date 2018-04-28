var mongoose = require('mongoose');
var Cafe = mongoose.model('cafes');

var createCafe = function(req, res) {
    var cafe = new Cafe({
        "name": req.body.name,
        "address": req.body.address,
        "distance": req.body.distance,
        "rating": req.body.rating,
        "photo": req.body.photo
    });
    cafe.save(function(err, newCafe){
        if(!err) {
            res.send(newCafe);
        } else {
            res.sendStatus(400);
        }
    });
};

var findAllCafes = function(req, res) {
    Cafe.find(function(err,cafes){
        if(!err) {
            res.send(cafes);
        } else {
            res.sendStatus(404);
        }
    });
};

var findOneCafe = function(req, res) {
    var cafeInx = req.params.id;
    Cafe.findById(cafeInx, function(err, cafe){
        if(!err) {
            res.send(cafe);
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.createCafe = createCafe;
module.exports.findAllCafes = findAllCafes;
module.exports.findOneCafe = findOneCafe;