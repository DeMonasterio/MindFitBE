const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    carpets: { type: String, required: false },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
