// Create Database
var mongoose = require('mongoose');

mongoose.connect('mongodb://quickhealthdb:12345678@ds161539.mlab.com:61539/quick-health', function(err){
    if(!err) {
        console.log('Connected to mongo');
    } else {
        console.log('Failed to connect to mongo');
    }
});

require('./disease.js');
require('./user.js');
require('./healthfacts.js');

const faker = require('faker');

var dataBase = [];

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var diseases = ["Asthma", "Bronchitis", "Calculi", "Deafness", "Encopresis", "Fibromatosis", "Geliphobia", 
"Headache", "Influenza", "Jones Syndrome", "Katz Syndrome", "Labyrinthitis",
"Malaria", "Nephrosclerosis", "Obesophobia", "Pachygyria", "Quinsy", "Rabies",
"Scleroderma", "Taeniasis", "Uremia", "Vipoma", "Warkany Syndrome", "Xanthinuria",
"Yellow Fever", "Zygomycosis"];

var profile = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        joinedMonth: "April",
        joinedYear: 2017,
        occupation: "Student",
        from: "Sydney",
        livesIn: "Melbourne",
        mobile: 61424567890,
        address: "800 Swanston Street, Melbourne VIC 3000, Australia",
        email: "iamastudent@yahoo.com",
        allergies: ["Doxycycline", "Stemetil prochlorperazine", "Amoxycillin"]
    };


var x;
for (x=0;x<10;x++){
    dataBase.push({name:faker.name.firstName(), job:faker.name.jobTitle()});
}

module.exports = dataBase;

module.exports = {
    dataBase: dataBase,
    length: x,
    alphabet: alphabet,
    diseases: diseases,
    profile: profile
};