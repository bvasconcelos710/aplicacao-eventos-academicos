const mongoose = require('../db/mongo');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;