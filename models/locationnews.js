var mongoose = require('mongoose');
var locnewsSchema = mongoose.Schema(
    {
     country: String,
     img: String,
     content:String,
     link: String,   
    }
);
module.exports = mongoose.model('locationnews', locnewsSchema);