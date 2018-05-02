var mongoose = require('mongoose');
var diseaseWikiSchema = mongoose.Schema(
    {
       name: String,
       bioname: String,
       fact: String,
       img: String,
       treat: String,
       diagnosis: String,
       lab: String,
       time: String,
       causes: String,
       symptoms: String,
       treatment: String,
       history: String
    }
);
module.exports = mongoose.model('diseasewikis', diseaseWikiSchema);