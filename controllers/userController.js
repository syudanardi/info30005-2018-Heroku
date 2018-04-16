const db = require('../models/db');


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


