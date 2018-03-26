var faker = require('faker');
const database = [
    {
        name: faker.name.firstName(),
        email: faker.internet.email()
    },
    {
        name: faker.name.firstName(),
        email: faker.internet.email()
    },
    {
        name: faker.name.firstName(),
        email: faker.internet.email()
    },
    {
        name: faker.name.firstName(),
        email: faker.internet.email()
    },
    {
        name: faker.name.firstName(),
        email: faker.internet.email()
    },
];

/*
const databaseUser = []

for (var i = 0; i < 5; i++) {
    
    
    var tempDatabase = {
        name: faker.name.firstName(),
        email: faker.internet.email()
    };

    
    var tempDatabase = [faker.name.firstName(), faker.internet.email()]
    databaseUser.push(tempDatabase);
}*/

// Passing the database array
module.exports = database;




