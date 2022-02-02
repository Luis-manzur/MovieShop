const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = mongoose.model('User', new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true},
    role: {  type: String, required:true},
    salt: {type: String, required: true},
}));

module.exports = User