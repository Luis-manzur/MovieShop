const Cart = require('../models/cart');
const Movie = require('../models/movie')
const Order = require('../models/order')

const controller = {};

controller.create = (req,res) => {
    const cart = new Cart(req.session.cart ? req.session.cart: {movies: {}});
    Movie.findById({_id: req.params._id}).then(movie => {
        Cart.create({movie: movie._id, user: req.session.userId}).then(() => res.redirect('/')); 
    });
};

controller.view = (req, res) => {
    Cart.find({user: req.session.userId}).populate('movie').then(cart => {
        res.render('store/cart', {cart: cart, total: getTotal(cart), isAuth: req.session.isAuth})
    });
};

const getTotal = (cart) => {
    total = 0
    for (var i = 0; i < cart.length; i++) {
        total += cart[i].movie.price
    }
    return total;
};

controller.pay = (req, res) => {
    const {paymentMethod} = req.body
    Cart.find({user: req.session.userId}).populate('movie').then(cart => {
        let movies = []
        for (var i = 0; i < cart.length; i++){
            movies.push(cart[i].movie)
        }
        Order.create({
            user: req.session.userId,
            movies:movies,
            paymentMethod: paymentMethod,
            total
        });
        Cart.deleteMany({user: req.session.userId}).then(() => res.render('store/purchased', {isAuth: req.session.isAuth}));
        
    });
};

const getMovies = (cart) => {
    var array = []
    for (var i = 0; i < cart.length; i++) {
        array.push(cart[i].movie._id); 
    }
    return array;
};

module.exports = controller