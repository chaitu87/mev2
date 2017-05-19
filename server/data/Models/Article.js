var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    	title: String,
        slug: String,
        body: String,
        shortdesc: String
});

ArticleSchema.virtual('date')
    .get(function() {
        return this._id.getTimestamp();
    });

mongoose.model('Article', ArticleSchema);