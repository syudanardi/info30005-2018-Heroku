const db = require('../models/db');
const mongoose = require('mongoose');
const Disease = mongoose.model('diseases');
const QF = mongoose.model('healthfacts');
const QQ = mongoose.model('healthquizzes');
const Wiki = mongoose.model('mydiseasewikidatas');
const Profile = mongoose.model('profiles');
const DiseaseWikis = mongoose.model('diseasewikis');
/*
let qfact;
let qquiz;


QF.find(function(err,quickfacts) {
    if(!err) {
        qfact = quickfacts;
    }
});

QQ.find(function(err,quickquiz) {
    if(!err) {
        qquiz = quickquiz;
    }
});
*/

module.exports.sayHello = function(req, res) {
    res.render("home");
};

module.exports.homerevised = function(req, res) {
    QF.find(function(err,quickfacts) {
        if(!err) {
            QQ.find(function(err,quickquiz) {
                if(!err) {
                    res.render("homepage_revised", {
                        qfdb:quickfacts,
                        qqdb:quickquiz
                    });
                } else {
                    res.sendStatus(400);
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports.home = function(req, res) {
    QF.find(function(err,quickfacts) {
        if(!err) {
            QQ.find(function(err,quickquiz) {
                if(!err) {
                    res.render("homepage", {
                        qfdb:quickfacts,
                        qqdb:quickquiz
                    });
                } else {
                    res.sendStatus(400);
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports.diseaseSpecific = function(req, res) {
    let id = req.params.id;
    DiseaseWikis.find(function(err,diseasewikis) {
        if(!err){
            res.render("diseasespecific2", {
                disease:diseasewikis,
                id:id
            });
        } else {
            res.sendStatus(400);
        }
    });
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
    });
};

module.exports.diseaseWiki = function(req, res) {
    res.locals.query = req.query;
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    Wiki.find(function(err,mydiseasewikidatas) {
        if(!err) {
            res.render("diseasewiki", {alphabet: alphabets,
                diseases: mydiseasewikidatas[0]["diseases"]
            });
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports.disease = function(req, res) {
    res.locals.query = req.query;
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    // Get the index of the alphabet in the array. 
    var index = alphabets.indexOf(req.params.id);
    Wiki.find(function(err,mydiseasewikidatas) {
        if(!err) {
            res.render("disease", {
                alphabet: alphabets,
                chooseAlphabet: alphabets[index],
                disease:mydiseasewikidatas[0]["diseases"][index],
                diseases:mydiseasewikidatas[0]["diseases"]
            })
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports.profile = function(req, res) {
    Profile.find({"email":req.body.email, "password":req.body.password}, function(err,profiles){
        if(!err){
            res.render("profile.ejs", {
                profile:profiles[0],
                name:profiles[0]["name"],
                email:profiles[0]["email"],
                phone:profiles[0]["phone"],
                joinDate:profiles[0]["joinDate"]
            });
        } else {
            res.sendStatus(405);
        }
    });
};

module.exports.realHome = function(req, res) {
    QF.find(function(err,quickfacts) {
        if(!err) {
            res.render("newHome", {
                db:quickfacts
            });
        } else {
            res.sendStatus(400);
        }
    });
};

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

module.exports.createProfile = function(req, res) {
    const newProfile = new Profile({
        name: req.body.firstname + ' ' + req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        joinDate: Date.now(),
        password: req.body.password
    });
    newProfile.save(function(err, newProfile){
        if(!err) {
            res.send(newProfile);
            console.log("New Profile Created\n");
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

// Saving the health fact to the database
module.exports.addHealthFactPage = function(req, res) {
    res.render("addhealthfact");
};

module.exports.saveHealthFact = function(req, res) {
    var newHealthFact = new QF({
        "fact": req.body.fact,
        "link": req.body.link
    });
    
    newHealthFact.save(function (err, newHealthFact){
        if (!err) {
            res.render('savehealthfact');
        } else {
            res.sendStatus(400);
        }
    });
};

// Saving the disease wiki to the database
module.exports.addDiseasePage = function(req, res) {
    res.render("adddisease");
};

module.exports.saveDisease = function(req, res) {

    var newDisease = new DiseaseWikis({
        "name": req.body.name,
        "bioname": req.body.bioname,
        "fact": req.body.fact,
        "img": req.body.image,
        "treat": req.body.treatable,
        "diagnosis": req.body.diagnosis,
        "lab": req.body.lab,
        "time": req.body.time,
        "causes": req.body.causes,
        "symptoms": req.body.symptoms,
        "treatment": req.body.treatment,
        "history": req.body.history
    });

    newDisease.save(function (err, newDisease){
        if (!err) {
            res.render('savedisease');
        } else {
            res.sendStatus(400);
        }
    });
};



