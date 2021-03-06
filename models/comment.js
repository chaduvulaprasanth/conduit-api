var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    articleId: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'Article'
    },
    commentText: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', commentSchema);
