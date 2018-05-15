const db = require('../models/db');
const mongoose = require('mongoose');
const passport = require('passport');
const Disease = mongoose.model('diseases');
const QF = mongoose.model('healthfacts');
const QQ = mongoose.model('healthquizzes');
const Wiki = mongoose.model('mydiseasewikidatas');
const Profile = mongoose.model('profiles');
const DiseaseWikis = mongoose.model('diseasewikis');
const bcrypt = require('bcrypt');

const LocationNews = mongoose.model('locationnews');
const OutbreakNews = mongoose.model('outbreaknews');
const TrendNews = mongoose.model('trendingnews');
const FeaturedVideos = mongoose.model('featuredvideos');

var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);

// temporary replacement for session pls don't judge
let buffer;

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
    // QF.find(function(err,quickfacts) {
    //     if(!err) {
    //         QQ.find(function(err,quickquiz) {
    //             if(!err) {
    //                 res.render("homepage_revised", {
    //                     qfdb:quickfacts,
    //                     qqdb:quickquiz
    //                 });
    //             } else {
    //                 res.sendStatus(400);
    //             }
    //         });
    //     } else {
    //         res.sendStatus(400);
    //     }
    // });

    var requestUrl = "http://ip-api.com/json";
    var country;
    $.ajax({
        url: requestUrl,
        type: 'GET',
        success: function(json)
            {   
                console.log("My country is: " + country);
                
            },
        error: function(err)
            {
                console.log("Request failed, error= " + err);
            }
    });

    var count = 4;
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
                                                    });

                                                    res.render("homepage_revised", {
                                                        qfdb:quickfacts,
                                                        qqdb:quickquiz,
                                                        vid: video,
                                                        locnews: locationNews,
                                                        trendnews: trendnews,
                                                        outbreaknews: outbreaknews,
                                                        user: req.user
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
/*
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
};*/

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

    Profile.findOne({"email":req.body.email}).exec(function (err, profile) {
        if (err) {
            res.sendStatus(404);
        } else if (!profile) {
            let err = new Error('User not found.');
            err.status = 401;
            res.sendStatus(401);
        }
        bcrypt.compare(req.body.password, profile.password, function (err, result) {
            if (result === true) {
                let curr = profile;
                buffer = curr;
                let day = curr["joinDate"].getDate();
                let year = curr["joinDate"].getFullYear();
                let month = curr["joinDate"].getMonth();
                let joined = '' + day + '/' + month + '/' + year;
                res.render("profile.ejs", {
                    profile:curr,
                    name:curr["name"],
                    phone:curr["phone"],
                    email:curr["email"],
                    joinDate:joined
                });
            } else {
                res.sendStatus(401);
            }
        })
    });
};

module.exports.currProfile = function(req,res) {
    if (!buffer){
        res.send(404);
        return;
    }
    let curr = buffer;
    console.log(curr);
    let day = curr["joinDate"].getDate();
    let year = curr["joinDate"].getFullYear();
    let month = curr["joinDate"].getMonth();
    let joined = '' + day + '/' + month + '/' + year;
    res.render("profile.ejs", {
        profile:curr,
        name:curr["name"],
        phone:curr["phone"],
        email:curr["email"],
        address:curr["address"],
        country:curr["country"],
        joinDate:joined
    });
};

module.exports.emailSubmit = function(req,res) {
    buffer["email"] = req.body.email;
    let curr = buffer;
    let day = curr["joinDate"].getDate();
    let year = curr["joinDate"].getFullYear();
    let month = curr["joinDate"].getMonth();
    let joined = '' + day + '/' + month + '/' + year;
    res.render("profile.ejs", {
        profile:curr,
        name:curr["name"],
        phone:curr["phone"],
        email:curr["email"],
        address:curr["address"],
        country:curr["country"],
        joinDate:joined
    });
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
/*
    };
    Profile.find({"email":req.body.email, "password":req.body.password}, function(err,profiles){
        if(!err){
            if (profiles.length > 0){
                let curr = profiles[0];
                let day = curr["joinDate"].getDate();
                let year = curr["joinDate"].getFullYear();
                let month = curr["joinDate"].getMonth();
                let joined = '' + day + '/' + month + '/' + year;
                res.render("oldProfile.ejs", {
                    profile:curr,
                    name:curr["name"],
                    phone:curr["phone"],
                    email:curr["email"],
                    joinDate:joined
                })}
            else
            {
                res.render("registrationform");
                // res.send("profile doesn't exist with the email/password combination");
            }
        } else {
            res.sendStatus(400);
        }
    });
};
*/

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
        address: req.body.address,
        country: req.body.country,
        joinDate: Date.now(),
        password: req.body.password
    });
    newProfile.save(function(err, newProfile){
        if(!err) {

            var requestUrl = "http://ip-api.com/json";
            var country;
            $.ajax({
                url: requestUrl,
                type: 'GET',
                success: function(json)
                    {   
                        
                        console.log("My country is: " + json.country);
                        country = json.country;
                    },
                error: function(err)
                    {
                        console.log("Request failed, error= " + err);
                    }
            });
        
            var count = 4;
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
                                                            });
        
                                                            res.render("homepage_revised", {
                                                                qfdb:quickfacts,
                                                                qqdb:quickquiz,
                                                                vid: video,
                                                                locnews: locationNews,
                                                                trendnews: trendnews,
                                                                outbreaknews: outbreaknews,
                                                                user: req.user
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

// Restrict access to root page

module.exports.home = function(req, res) {
    res.render('home', { user : req.user });
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
    res.redirect('/');
};


