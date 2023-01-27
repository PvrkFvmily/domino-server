let mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    user: {
        type: String,
    }
}, {
    timestamps: true
})

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    comments: [CommentSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)