const mongoose = require('mongoose');
const Post = require('./Post.js');

const CarpetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    themeNumber: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    usersAllowed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] 
});

const Carpet = mongoose.model('Carpet', CarpetSchema);

module.exports = Carpet;
