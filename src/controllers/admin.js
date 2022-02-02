const User = require('../models/user');
const Movie = require('../models/movie');
const Order = require('../models/order')

const controller = {};


controller.landing = (req, res) => {
    res.render('admin/admin');
};

controller.listUsers = (req, res) =>{
    User.find().then(users => res.render('admin/users', {users: users}));
};

controller.listMovies = (req, res) => {
    Movie.find().then(movies => res.render('admin/movies', {movies: movies}));
};

controller.addMovie = (req, res) =>{
    res.render('admin/add_movie');
};

controller.saveMovie = (req, res) =>  {
    Movie.create(req.body);
    res.redirect('/admin/movies');
};

controller.deleteMovie = (req, res) => {
    Movie.findByIdAndDelete(req.params._id).then(() => res.redirect('/admin/movies'));
};

controller.editMovie = (req, res) => {
    Movie.findById(req.params._id).then(movies => {
        res.render('admin/edit_movie', {movie: movies});
    });
};

controller.updateMovie = (req, res) =>  {
    Movie.findByIdAndUpdate(req.params._id, req.body).then(() => res.redirect('/admin/movies')); 
};

controller.removeAdmin =  (req, res) => {
    User.findByIdAndUpdate(req.params._id, {role: 'client'}).then(() => res.redirect('/admin/users'));
};

controller.makeAdmin =  (req, res) => {
    User.findByIdAndUpdate(req.params._id, {role: 'admin'}).then(res.redirect('/admin/users'));
};

controller.listOrders = (req, res) => {
    Order.find().then(orders=> res.render('admin/orders', {orders: orders}));
}

module.exports = controller