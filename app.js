// Import the express
const express = require('express');
const router = require('./routes/userRoute');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

//Data Base
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./models/db.js');

// Set the app to be able to use ejs.
app.set('view engine','ejs');

app.use('/',router);

app.use(express.static('public'));

app.use(express.static('resources'));

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

// Start the app at the Port point
app.listen(PORT,function(){
    console.log(`Express listening on port ${PORT}`);
});

