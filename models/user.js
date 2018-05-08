var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        _id: String,
        firstname: String,
        lastname: String,
        //age: { type: Number, min: 18, max: 65, required: true },
        //occupation: String,
        //loginStreak: { type: Number, min: 0, required: true}
        email: String,
        phone: String,
        password: String,
        country: String,
        address: String
    }
);
module.exports = mongoose.model('users', userSchema);