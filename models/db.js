const faker = require('faker');


var dataBase = [];
var x;
for (x=0;x<10;x++){
    dataBase.push({name:faker.name.firstName(), job:faker.name.jobTitle()});
}

module.exports = dataBase;

module.exports = {
    dataBase: dataBase,
    length: x
};