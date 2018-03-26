const users = require('../models/db');

module.exports.homePage = function(req, res) {
    res.send('Author William Liandri <br><a href="/users">Click here to go to DB</a> ');
};

module.exports.printAllUsers = function(req, res) {
    var newData = "";
    for (var i = 0; i < 5; i++) {
        newData += "<h1>Name: " + users[i].name+ "</h1><br>" 
            + " <p>Email:  " 
        + users[i].email + "</p><br>";
    }
    res.send(newData + "<br><a href='/'>Back</a>");
};

module.exports.fetchUser = function(req, res) {
    const userID = req.params.id;
    res.render("user_template", {
        name:users[req.params.id].name,
        email:users[userID].email
    });
};


