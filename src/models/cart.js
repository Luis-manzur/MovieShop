const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = mongoose.model('Cart', new Schema({
    movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}));

module.exports = Cart