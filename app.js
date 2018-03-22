const express = require('express');
const router = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine','ejs');

app.use('/',router);

app.listen(PORT,function(){
    console.log(`Express listening on port ${PORT}`);
});