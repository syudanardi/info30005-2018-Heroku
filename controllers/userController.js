const db = require('../models/db');


module.exports.sayHello = function(req, res) {
    res.send('Hi World');
};

module.exports.printAll = function(req, res) {
    res.render("all",{
        db:db.dataBase,
        length:db.length
    })
};

module.exports.printUser = function(req, res) {
    res.render("home",{
        name:db.dataBase[req.params.id].name,
        job:db.dataBase[req.params.id].job
    })
};
