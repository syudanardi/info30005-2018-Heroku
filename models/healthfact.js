var mongoose = require('mongoose');
var healthfactSchema = mongoose.Schema(
    {
        fact: String,
        link: String,

    }
);
module.exports = mongoose.model('healthfacts', healthfactSchema);