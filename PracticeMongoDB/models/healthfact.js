var mongoose = require('mongoose');
var healthFactSchema = mongoose.Schema(
    {
        "fact": String,
    }
);
mongoose.model('healthfact', healthFactSchema);