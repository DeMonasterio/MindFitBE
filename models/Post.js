const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    theme: { type: String, required: true },
    image: { type: Buffer }, 
    comments: { 
        type: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
            text: { type: String, required: true } 
        }],
        default: [],
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
