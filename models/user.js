var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        password: String,
        joinDate: Date
    }
);
module.exports = mongoose.model('users', userSchema);