const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const profileSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        country: String,
        joined: Date,
        newsLocation: String,
        admin: Boolean
    }
);

profileSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('profiles', profileSchema);