var mongoose = require('mongoose');
var cafeSchema = mongoose.Schema(
    {
        "name": String,
        "address": String,
        "distance": String,
        "rating": String,
        "photo": String,
    }
);
mongoose.model('cafes', cafeSchema);