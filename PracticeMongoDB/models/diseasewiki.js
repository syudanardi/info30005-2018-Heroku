var mongoose = require('mongoose');
var diseaseWikiSchema = mongoose.Schema(
    {
        "name": String,
        "causes": String,
    }
);
mongoose.model('diseasewikis', diseaseWikiSchema);