// Import the express
const express = require('express');
const router = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the app to be able to use ejs.
app.set('view engine','ejs');

app.use('/',router);

app.use(express.static(__dirname + '/public'));

// Start the app at the Port point
app.listen(PORT,function(){
    console.log(`Express listening on port ${PORT}`);
});
