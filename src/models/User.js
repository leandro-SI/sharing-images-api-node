const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = user;