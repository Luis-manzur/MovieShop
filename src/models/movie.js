const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = mongoose.model('Movie', new Schema({
    name: String,
    genre: String,
    year: String,
    duration: String,
    rating: String,
    price: Number,
    description: String,
    img: String
}));

module.exports = Movie