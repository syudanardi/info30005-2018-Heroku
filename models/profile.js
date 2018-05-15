const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

const profileSchema = mongoose.Schema(
    {
        /*name: String,
        email: String,
        password: String,
        joinDate: Date,
        country: String*/
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        country: String
    }
);

/*profileSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});*/

profileSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('profiles', profileSchema);