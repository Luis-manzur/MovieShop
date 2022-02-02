const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = mongoose.model('Movie', new Schema({
    name: String,
    type: String,
    rating: Number,
    price: Number,
    description: String,
    img: String
}));

module.exports = Movie