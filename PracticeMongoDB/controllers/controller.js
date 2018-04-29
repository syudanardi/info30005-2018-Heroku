// const database = require('../models/db');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
// var Cafe = mongoose.model('cafes');
var DiseaseWiki = mongoose.model('diseasewikis');
var HealthFact = mongoose.model('healthfact');

// var createCafe = function(req, res) {
//     var cafe = new Cafe({
//         "name": req.body.name,
//         "address": req.body.address,
//         "distance": req.body.distance,
//         "rating": req.body.rating,
//         "photo": req.body.photo
//     });
//     cafe.save(function(err, newCafe){
//         if(!err) {
//             res.send(newCafe);
//         } else {
//             res.sendStatus(400);
//         }
//     });
// };

var createDiseaseWiki = function(req, res) {
    var diseasewiki = new DiseaseWiki( {
        "name": req.body.name,
        "causes": req.body.causes
    });
    console.log(diseasewiki);
    // diseasewiki.save(function (err, newDiseaseWiki){
    //     if (!err) {
    //         res.send(newDiseaseWiki);
    //     } else {
    //         res.sendStatus(400);
    //     }
    // });
}

module.exports.saveDiseaseData = function(req, res) {
    var newDiseaseData = new DiseaseWiki({
        "name":req.body.diseaseName,
        "causes": req.body.causes
    });

    mongoose.connect('mongodb://quickhealthdb:12345678@ds161539.mlab.com:61539/quick-health', function(err, db){
         if (!err) {
             db.collection('diseasewikis').save(newDiseaseData, function(err, result) {    
                 db.close();
             });
             res.render('savedata');
         } else {
             res.status(400).send("Unable to save to database");
         }

    });

    // newDiseaseData.save()
    // .then(item => {
    //     res.render('savedata');
    // })
    // .catch(err => {
    //     res.status(400).send("Unable to save to database");
    // });
};

module.exports.createHealthFact = function(req, res) {
    var healthfact = new HealthFact( {
        "fact": req.body.fact
    });
    healthfact.save(function (err, newHealthFact){
        if (!err) {
            res.send(newHealthFact);
        } else {
            res.sendStatus(400);
        }
    });
}

// var findAllCafes = function(req, res) {
//     Cafe.find(function(err,cafes){
//         if(!err) {
//             res.send(cafes);
//         } else {
//             res.sendStatus(404);
//         }
//     });
// };

var allDiseaseWiki = function(req, res) {
    DiseaseWiki.find(function(err, diseasewikis){
        if(!err) {
            res.send(diseasewikis);
        } else {
            res.sendStatus(404);
        }
    });
}

module.exports.showingHome = function(req, res) {
    res.render("home");
};



module.exports.healthFactPage = function(req, res) {
    res.render("healthfact");
};

module.exports.saveHealthFact = function(req, res) {
    var newHealthFact = new HealthFact(req.body);
    newHealthFact.save()
    .then(item => {
        res.render('savehealthfact');
    })
    .catch(err => {
        res.status(400).send("Unable to save to database")
    })
};


// var findOneCafe = function(req, res) {
//     var cafeInx = req.params.id;
//     Cafe.findById(cafeInx, function(err, cafe){
//         if(!err) {
//             res.send(cafe);
//         } else {
//             res.sendStatus(404);
//         }
//     });
// };

// module.exports.createCafe = createCafe;
// module.exports.findAllCafes = findAllCafes;
// module.exports.findOneCafe = findOneCafe;

module.exports.createDiseaseWiki = createDiseaseWiki;
module.exports.allDiseaseWiki = allDiseaseWiki;