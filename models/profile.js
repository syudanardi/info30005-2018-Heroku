var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var profileSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        password: String,
        joinDate: Date
    }
);

profileSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('profiles', profileSchema);