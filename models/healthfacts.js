var mongoose = require('mongoose');
var diseaseSchema = mongoose.Schema(
    {
        fact: String,
        link: String
    }
);
module.exports = mongoose.model('healthfacts', diseaseSchema);