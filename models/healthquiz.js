const mongoose = require('mongoose');
const diseaseSchema = mongoose.Schema(
    {
        "question": String,
        "option": Array,
        "answer": String
    }
);
module.exports = mongoose.model('healthquizzes', diseaseSchema);