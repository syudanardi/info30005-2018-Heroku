var mongoose = require('mongoose');
var diseaseSchema = mongoose.Schema(
    {
        "name": String,
        "causes": String,
        "symptoms": String,
        "treatment": String,
        "history": String,
    }
);
mongoose.model('cafes', diseaseSchema);