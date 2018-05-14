var mongoose = require('mongoose');
var outbreakNewsSchema = mongoose.Schema(
    {
        title: String,
        content: String,
        img: String,
        link: String
    }
);
module.exports = mongoose.model('outbreaknews', outbreakNewsSchema);