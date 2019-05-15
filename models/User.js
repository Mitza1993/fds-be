var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    id: String,
    email: String,
    role: String,
    password: String,
    firstName: String,
    lastName: String,
    displayName: String,
    phone: String,
    address: String,
    authToken: String
});

module.exports = mongoose.model('User', UserSchema);