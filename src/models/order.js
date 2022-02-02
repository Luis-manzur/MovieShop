const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Order = mongoose.model('Order', new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
    paymentMethod: { type: String, require: true},
    total:  { type: Number, require: true},
}));

module.exports = Order