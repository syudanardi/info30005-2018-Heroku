var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        name: String,
        joinDate: Date,
        age: { type: Number, min: 18, max: 65, required: true },
        occupation: String,
        loginStreak: { type: Number, min: 0, required: true}
    }
);
module.exports = mongoose.model('users', userSchema);