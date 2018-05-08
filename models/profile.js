var mongoose = require('mongoose');
var profileSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        password: String,
        joinDate: Date
    }
);
module.exports = mongoose.model('profiles', profileSchema);