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

const where = require('node-where');

function getClientIP(req){
    var clientip = req.headers["x-forwarded-for"];

    if (clientip) {
        var list = clientip.split(",");
        clientip = list[list.length-1];
    } else {
        clientip = req.connection.remoteAddress;
    }
    return clientip;
};

module.exports.home = function(req, res) {
    var now = new Date();
    var nowDate = now.getDate();

    // Get the Client IP address
    var clientip = getClientIP(req);

    // Get the current location
    var country;
   
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
                                                    let locationNews = new Array();
                                                    if (!req.user) {
                                                        // Get the user's country location.
                                                        where.is(clientip, function (err, result) {
                                                            if (result) {
                                                                country = result.get("country");
                                                                // Show news based on the user's location.
                                                                locnews.forEach(function (currlocnews) {
                                                                    if (currlocnews.country == country) {
                                                                        locationNews[index] = currlocnews;
                                                                        index++;
                                                                    }

                                                                    // If the news are less than 4, it will add some random news.
                                                                    locationNews = addRandomNews(index, locnews, locationNews);
                                                                });
                                                            }
                                                            res.render("home", {
                                                                qfdb: quickfacts,
                                                                qqdb: quickquiz,
                                                                vid: video,
                                                                locnews: locationNews,
                                                                trendnews: trendnews,
                                                                outbreaknews: outbreaknews,
                                                                user: req.user,
                                                                date: nowDate
                                                            });
                                                        });
                                                    }
                                                    else {
                                                        // uh user is loggedIn
                                                        locnews.forEach(function (currlocnews) {
                                                            if (currlocnews.country == req.user.newsLocation) {
                                                                locationNews[index] = currlocnews;
                                                                index++;
                                                            }

                                                            // If the news are less than 4, it will add some random news.
                                                            locationNews = addRandomNews(index, locnews, locationNews);
                                                        });
                                                        res.render("home", {
                                                            qfdb: quickfacts,
                                                            qqdb: quickquiz,
                                                            vid: video,
                                                            locnews: locationNews,
                                                            trendnews: trendnews,
                                                            outbreaknews: outbreaknews,
                                                            user: req.user,
                                                            date: nowDate
                                                        });
                                                    }
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
                    res.render("diseasespecific", {
                        disease:diseasespec,
                        user: req.user
                    });
                }
            });
        } else {
            res.sendStatus(400);
        }
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
                diseases: listDiseases, 
                user: req.user
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
                diseases: listDiseases, user: req.user
            });

        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.profile = function(req, res) {
    
    if(!req.user) {
        res.redirect('/register');
        return;
    }

    // Get the Client IP address
    var clientip = getClientIP(req);

    var country;
    where.is(clientip, function(err, result) {
        if (result) {
            country = result.get("country");
            var name = req.user.firstName + " " + req.user.lastName;
            res.render('profile', { 
            user: req.user,
            name: name,
            country: country,
            clientip: clientip
            });
        }
    });
};

module.exports.updateProfile = function(req, res) {
    var query = { username: req.body.username };

    Profile.findOneAndUpdate(query, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.email,
        country: req.body.country,
        newsLocation: req.body.newsLocation
    }, function(err, profile){
        
        if (!err) {
            res.redirect('/');
        } else {
            res.sendStatus(404);
        }  
    });
}

module.exports.aboutPage = function(req,res) {
    res.render('aboutUs', {user: req.user});
};

// Saving the health fact to the database
module.exports.addHealthFactPage = function(req, res) {
    res.render("addhealthfact", {user: req.user});
};

module.exports.saveHealthFact = function(req, res) {
    var newHealthFact = new QF({
        "fact": req.body.fact,
        "link": req.body.link
    });
    
    newHealthFact.save(function (err, newHealthFact){
        if (!err) {
            res.redirect('/');
            // res.render('savehealthfact', {user: req.user});
        } else {
            res.sendStatus(400);
        }
    });
};

// Saving the health fact to the database
module.exports.addQuickQuizPage = function(req, res) {
    res.render("addquickquiz", {user: req.user});
};

module.exports.saveQuickQuiz = function(req, res) {
    
     var option = [req.body.option1, req.body.option2];
     var newQuickQuiz = new QQ({
         "question": req.body.question,
         "option": option,
         "answer": req.body.answer
     });
    
     newQuickQuiz.save(function (err, newQuickQuiz){
          if (!err) {
             res.redirect('/');
         } else {
             res.sendStatus(400);
         }
     });
};

// Saving the disease wiki to the database
module.exports.addDiseasePage = function(req, res) {
    res.render("adddisease", {user: req.user});
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
            res.redirect('/');
            // res.render('savedisease', {user: req.user});
        } else {
            res.sendStatus(400);
        }
    });
};

// Saving the location news  to the database
module.exports.addLocationNewsPage = function(req, res) {
    res.render("addlocationnews", {user: req.user});
};

module.exports.saveLocationNews = function(req, res) {
    
     var newLocationNews = new LocationNews({
         "country": req.body.country,
         "img": req.body.img,
         "content": req.body.content,
         "link": req.body.link
     });
    
     newLocationNews.save(function (err, newLocationNews){
          if (!err) {
             res.redirect('/');
         } else {
             res.sendStatus(400);
         }
     });
};

// Saving the trending news to the database
module.exports.addTrendingNewsPage = function(req, res) {
    res.render("addtrendingnews", {user: req.user});
};

module.exports.saveTrendingNews = function(req, res) {
    
     var newTrendingNews = new TrendNews({
         "title": req.body.title,
         "content": req.body.content,
         "img": req.body.img,
         "link": req.body.link
     });
    
     newTrendingNews.save(function (err, newTrendingNews){
          if (!err) {
             res.redirect('/');
         } else {
             res.sendStatus(400);
         }
     });
};

// Saving the outbreak news to the database
module.exports.addOutbreakNewsPage = function(req, res) {
    res.render("addoutbreaknews", {user: req.user});
};

module.exports.saveOutbreakNews = function(req, res) {
    
     var newOutbreakNews = new OutbreakNews({
         "title": req.body.title,
         "content": req.body.content,
         "img": req.body.img,
         "link": req.body.link
     });
    
     newOutbreakNews.save(function (err, newOutbreakNews){
          if (!err) {
            res.redirect('/');
         } else {
             res.sendStatus(400);
         }
     });
};

// Saving the outbreak news to the database
module.exports.addFeaturedVideoPage = function(req, res) {
    res.render("addfeaturedvideo", {user: req.user});
};

module.exports.saveFeaturedVideo = function(req, res) {
    
     var newFeaturedVideo = new FeaturedVideos({
         "title": req.body.title,
         "link": req.body.link
     });
    
     newFeaturedVideo.save(function (err, newFeaturedVideo){
          if (!err) {
            res.redirect('/');
         } else {
             res.sendStatus(400);
         }
     });
};

// Go to registration page
module.exports.register = function(req, res) {
    res.render('registrationform', {user: req.user});
};

// Post registration
module.exports.doRegister = function(req, res) {
    var country;
    where.is(getClientIP(req), function(err, result) {
        if (result) {
            country = result.get("country");
            Profile.register(new Profile({ username : req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, country: req.body.country, joined: Date.now(), newsLocation: req.body.country, admin: Boolean(req.body.admin)}), req.body.password, function(err, user) {
                if (err) {
                    return res.sendStatus(404);
                }
                req.body.username = user.username;
                console.log("request data: "+req.body.country);
                console.log("submitted data: "+user.country);
                passport.authenticate('local')(req, res, function () {
                    res.redirect('/');
                });
            });
        }
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
