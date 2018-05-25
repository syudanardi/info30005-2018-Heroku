// Import the express
const express = require('express');
const router = require('./routes/userRoute');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Data Base
app.use(bodyParser.urlencoded({ extended: true }));
require('./models/db.js');

// Set the app to be able to use ejs.
app.set('view engine','ejs');

app.use(express.static('public'));

app.use(express.static('resources'));

app.use(require('express-session')({
    secret: 'work hard',
    resave: false,
    saveUninitialized: false
}));

// Set the app to be able to use passport. 
app.use(passport.initialize());
app.use(passport.session());

app.use('/',router);

const User = require('./models/profile');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Start the app at the Port point
app.listen(PORT,function(){
    console.log(`Express listening on port ${PORT}`);
});
