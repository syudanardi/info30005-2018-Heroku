const db = require('../models/db');
const mongoose = require('mongoose');
const Disease = mongoose.model('diseases');

module.exports.sayHello = function(req, res) {
    res.render("home");
};

module.exports.homePage = function(req, res) {
    res.render("homepage");
};

module.exports.diseaseSpecific = function(req, res) {
    res.render("diseasespecific");
};

module.exports.registrationForm = function(req, res) {
    res.render("registrationform");
};

module.exports.navbar = function(req, res) {
    res.render("navbar");
};

module.exports.diseasemap = function(req, res) {
    res.render("epiMap");
};

module.exports.footer = function(req, res) {
    res.render("footer");
};

module.exports.printAll = function(req, res) {
    res.render("all",{
        db:db.dataBase,
        length:db.length
    })
};

module.exports.printUser = function(req, res) {
    res.render("user",{
        name:db.dataBase[req.params.id].name,
        job:db.dataBase[req.params.id].job
    })
};

module.exports.diseaseWiki = function(req, res) {
    res.locals.query = req.query;
    res.render("diseasewiki", {alphabet: db.alphabet, diseases: db.diseases
    })
};

module.exports.disease = function(req, res) {
    res.locals.query = req.query;
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // Get the index of the alphabet in the array. 
    var index = alphabets.indexOf(req.params.id);
    res.render("disease", {alphabet: db.alphabet, 
        chooseAlphabet: db.alphabet[index],
        disease: db.diseases[index],
        diseases: db.diseases
    })
}

module.exports.profile = function(req, res) {
    res.render("profile", {profile: db.profile, diseases: db.diseases})
}

module.exports.realHome = function(req, res) {
    res.render("newHome");
}

module.exports.createDisease = function(req, res) {
    const disease = new Disease({
        name: req.body.name,
        causes: req.body.causes,
        symptoms: req.body.symptoms,
        treatment: req.body.treatment,
        history: req.body.history,
    });
    disease.save(function(err, newDisease){
        if(!err) {
            res.send(newDisease);
            console.log("message sent")
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports.findAllDisease = function(req, res) {
    let buffer = "";
    Disease.find(function(err,diseases){
        if(!err) {
            diseases.forEach(function(member) {
                buffer = buffer + member + '</br>';
            });
            res.send(buffer);

        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.createForm = function(req, res){
    res.render("dbPractice");

};

module.exports.displayData = function(req,res){
    let id = req.params.id;
    Disease.find(function(err,diseases){
        if(!err) {
            res.send(diseases[id]);
        } else {
            res.sendStatus(404);
        }
    });
};