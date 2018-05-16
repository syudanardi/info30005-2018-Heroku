const db = require('../models/db');
const mongoose = require('mongoose');
const passport = require('passport');
const Disease = mongoose.model('diseases');
const QF = mongoose.model('healthfacts');
const QQ = mongoose.model('healthquizzes');
const Profile = mongoose.model('profiles');
const DiseaseWikis = mongoose.model('diseasewikis');

const LocationNews = mongoose.model('locationnews');
const OutbreakNews = mongoose.model('outbreaknews');
const TrendNews = mongoose.model('trendingnews');
const FeaturedVideos = mongoose.model('featuredvideos');

var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);

module.exports.homerevised = function(req, res) {

    var now = new Date();
    var nowDate = now.getDate();

    var requestUrl = "http://ip-api.com/json";
    var country;
    $.ajax({
        url: requestUrl,
        type: 'GET',
        success: function(json)
            {   
                country = json.country;
                console.log("My country is: " + country);
                
            },
        error: function(err)
            {
                console.log("Request failed, error= " + err);
            }
    });

    var addRandomNews = function(index, locnews, locationNews){
        if (locnews.length < 4 ){
            return
        }
        if (index < 3) {
            locnews.forEach(function (currlocnews) {
                if (!locationNews.includes(currlocnews)){
                    locationNews[index] = currlocnews;
                    index ++;
                }
            });
        }
        return locationNews;
    };

    var index = 0;
    var locationNews = new Array();

    QF.find(function(err,quickfacts) {
        if(!err) {
            QQ.find(function(err,quickquiz) {
                if(!err) {
                    FeaturedVideos.find(function(err, video){
                        
                        if (!err) {
                            OutbreakNews.find(function(err, outbreaknews) {
                                if (!err) {
                                    TrendNews.find(function(err, trendnews) {
                                        if (!err) {
                                            LocationNews.find(function(err, locnews) {
                                                if (!err) {
                                                    locnews.forEach(function(currlocnews) {
                                                        if(currlocnews.country == country) {
                                                            locationNews[index] = currlocnews;
                                                            index++;
                                                        }
                                                        locationNews = addRandomNews(index,locnews, locationNews);
                                                    });
                                                    res.render("homepage_revised", {
                                                        qfdb:quickfacts,
                                                        qqdb:quickquiz,
                                                        vid: video,
                                                        locnews: locationNews,
                                                        trendnews: trendnews,
                                                        outbreaknews: outbreaknews,
                                                        user: req.user,
                                                        date: nowDate
                                                    });
                                                } else {
                                                    res.sendStatus(400);
                                                }
                                            });
                                        } else {
                                            res.sendStatus(400);
                                        }
                                    });
                                } else {
                                    res.sendStatus(400);
                                }
                            });
                        } else {
                            res.sendStatus(400);
                        }
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
    let diseasename = req.params.id;
    DiseaseWikis.find(function(err,diseasewikis) {
        if(!err){
            diseasewikis.forEach(function(diseasespec) {
                if (diseasespec.name == diseasename) {
                    res.render("diseasespecific2", {
                        disease:diseasespec,
                    });
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports.registrationForm = function(req, res) {
    res.render("registrationform");
};

module.exports.diseasemap = function(req, res) {
    res.render("epiMap");
};

module.exports.diseaseWiki = function(req, res) {
    res.locals.query = req.query;
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    var indexListDiseases = 0;
    var listDiseases = new Array();
    DiseaseWikis.find(function(err,listdisease){
        if(!err) {
            listdisease.forEach(function(member) {
                listDiseases[indexListDiseases] = member.name;
                indexListDiseases++;
            });

            listDiseases.sort();
            res.render("diseasewiki", {alphabet: alphabets,
                diseases: listDiseases
            });

        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.disease = function(req, res) {
    res.locals.query = req.query;
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    // Get the index of the alphabet in the array. 
    var index = alphabets.indexOf(req.params.id);

    var indexListDiseases = 0;
    var listDiseases = new Array();
    DiseaseWikis.find(function(err,listdisease){
        if(!err) {
            listdisease.forEach(function(member) {
                listDiseases[indexListDiseases] = member.name;
                indexListDiseases++;
            });

            listDiseases.sort();
            res.render("disease", {alphabet: alphabets,
                chooseAlphabet: alphabets[index],
                diseases: listDiseases
            });

        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.profile = function(req, res) {
    if (!req.user){
        res.redirect('/notlogged');
        return
    }

    var name = req.user.firstName + " " + req.user.lastName;
    res.render('profile', { 
        user: req.user,
        name: name
    });
};

module.exports.currProfile = function(req,res) {
    var name = req.user.firstName + " " + req.user.lastName;
    res.render('profile', { user: req.user, name: name});
};

module.exports.aboutPage = function(req,res) {
    res.render('aboutUs');
};

module.exports.profilePage = function(req,res) {
    res.render('profilePage');
};

module.exports.emailSetting = function(req,res) {
    res.render('settings');
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
        address: req.body.address,
        country: req.body.country,
        joinDate: Date.now(),
        password: req.body.password
    });
    newProfile.save(function(err, newProfile){
        res.render('/')
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
            res.send(diseases[id]["symptoms"]);
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

module.exports.countDisease = function(req, res) {
    let indexListDiseases = 0;
    let listDiseases = new Array();
    DiseaseWikis.find(function(err,listdisease){
        if(!err) {
            listdisease.forEach(function(member) {
                listDiseases[indexListDiseases] = member.name;
                indexListDiseases++;
            });
            listDiseases.sort();
            res.send(listDiseases);

        } else {
            res.sendStatus(404);
        }
    });
};

// Go to registration page
module.exports.register = function(req, res) {
    res.render('registrationform');
};

// Post registration
module.exports.doRegister = function(req, res) {
    Profile.register(new Profile({ username : req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, country: req.body.country }), req.body.password, function(err, user) {
        if (err) {
            return res.sendStatus(404);
        }
        req.body.username = user.username;
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};

// Go to login page
module.exports.login = function(req, res) {
    res.render('signin');
};

// Post login
module.exports.doLogin = function(req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
};

// logout
module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/notlogged');
};

module.exports.logoutScreen = function(req, res){
    res.render('loggedOut')
};
