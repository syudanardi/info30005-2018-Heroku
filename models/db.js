const faker = require('faker');


var dataBase = [];

<<<<<<< HEAD
=======

>>>>>>> 4a0bf384ff89295f3f63beac3ec7be43a4640d94
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
<<<<<<< HEAD
        address: "800 Swanston Street, Melbourne VIC 3000, Australia",
        email: "iamastudent@yahoo.com",
        allergies: ["Doxycycline", "Stemetil prochlorperazine", "Amoxycillin"]
=======
        address: "800 Swanston Street",
        email: "iamgreat@yahoo.com",
        allergies: ["Doxycycline", "Stemetil prochlorperazine"]
>>>>>>> 4a0bf384ff89295f3f63beac3ec7be43a4640d94
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 4a0bf384ff89295f3f63beac3ec7be43a4640d94
