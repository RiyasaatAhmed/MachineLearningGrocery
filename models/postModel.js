
const mongoose = require('mongoose')

// Creating a schema for Posts
const postSchema = new mongoose.Schema({
    autherName: {
        type: String,
        unique: false,
        required: true
    },
    autherGmail: {
        type : String
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: String
    },
    date: {
        type: Date,
        default: new Date()
    },
    likes: [{
        type: String
    }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post;



