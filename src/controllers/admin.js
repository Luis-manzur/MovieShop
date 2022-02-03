const User = require('../models/user');
const Movie = require('../models/movie');
const Order = require('../models/order');
const request = require('request');

const controller = {};


controller.landing = (req, res) => {
    res.render('admin/admin');
};

controller.listUsers = (req, res) => {
    User.find().then(users => res.render('admin/users', { users: users }));
};

controller.listMovies = (req, res) => {
    Movie.find().then(movies => res.render('admin/movies', { movies: movies }));
};

controller.addMovie = (req, res) => {
    res.render('admin/add_movie');
};

controller.saveMovie = (req, res) => {
    const { id, price } = req.body

    

    const options = {
        method: 'GET',
        url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
        qs: { r: 'json', i: id },
        headers: {
            'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
            'x-rapidapi-key': '18846d2ed5msh29ab5fdf65962d3p190063jsnf68462866e43',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        const obj = JSON.parse(body)
        Movie.create({
            name: obj.Title,
            year: obj.Released,
            duration: obj.Runtime,
            img: obj.Poster,
            description: obj.Plot,
            rating: obj.imdbRating,
            genre: obj.Genre,
            price: price,
            
        });
    });

    res.redirect('/admin/movies');
};

controller.deleteMovie = (req, res) => {
    Movie.findByIdAndDelete(req.params._id).then(() => res.redirect('/admin/movies'));
};

controller.editMovie = (req, res) => {
    Movie.findById(req.params._id).then(movies => {
        res.render('admin/edit_movie', { movie: movies });
    });
};

controller.updateMovie = (req, res) => {
    Movie.findByIdAndUpdate(req.params._id, req.body).then(() => res.redirect('/admin/movies'));
};

controller.removeAdmin = (req, res) => {
    User.findByIdAndUpdate(req.params._id, { role: 'client' }).then(() => res.redirect('/admin/users'));
};

controller.makeAdmin = (req, res) => {
    User.findByIdAndUpdate(req.params._id, { role: 'admin' }).then(res.redirect('/admin/users'));
};

controller.listOrders = (req, res) => {
    Order.find().then(orders => res.render('admin/orders', { orders: orders }));
}

module.exports = controller