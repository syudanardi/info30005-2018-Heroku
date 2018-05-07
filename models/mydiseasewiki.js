//Bukan Yang ini!
var mongoose = require('mongoose');
var wikiSchema = mongoose.Schema(
    {
        diseases: Array,
    }
);
module.exports = mongoose.model('mydiseasewikidatas', wikiSchema);