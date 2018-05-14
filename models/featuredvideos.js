var mongoose = require('mongoose');
var featureVideoSchema = mongoose.Schema(
    {
        title: String,
        link: String
    }
);
module.exports = mongoose.model('featuredvideos', featureVideoSchema);