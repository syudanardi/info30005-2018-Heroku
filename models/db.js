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

var dataBase = [];

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var diseases = ["Asthma", "Bronchitis", "Calculi", "Deafness", "Encopresis", "Fibromatosis", "Geliphobia", 
"Headache", "Influenza", "Jones Syndrome", "Katz Syndrome", "Labyrinthitis",
"Malaria", "Nephrosclerosis", "Obesophobia", "Pachygyria", "Quinsy", "Rabies",
"Scleroderma", "Taeniasis", "Uremia", "Vipoma", "Warkany Syndrome", "Xanthinuria",
"Yellow Fever", "Zygomycosis"];

module.exports = dataBase;

module.exports = {
    dataBase: dataBase,
    length: x,
    alphabet: alphabet,
    diseases: diseases,
    profile: profile
};