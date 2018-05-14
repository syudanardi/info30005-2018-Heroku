var mongoose = require('mongoose');
var trendingNewsSchema = mongoose.Schema(
    {
        title: String,
        content: String,
        img: String,
        link: String
    }
);

module.exports = mongoose.model('trendingnews', trendingNewsSchema);