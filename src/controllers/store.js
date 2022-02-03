const Movie = require('../models/movie');

const controller = {};

controller.listMovies = (req, res) => {
    isAdmin = checkIsAdmin(req)
    isAuth = req.session.isAuth
    Movie.find().then(movies => res.render('store/items', {items: movies, isAuth: isAuth}));
};

controller.listGenreMovies = (req, res) => {
    isAdmin = checkIsAdmin(req)
    isAuth = req.session.isAuth

    if (req.params.genre == 'action') {
        Movie.find({genre: /Action/}).then(movies => res.render('store/items', {items: movies, isAuth: isAuth, isAdmin: isAdmin}));
    } else if (req.params.genre == 'comedy') {
        Movie.find({genre: /Comedy/}).then(movies => res.render('store/items', {items: movies, isAuth: isAuth, isAdmin: isAdmin}));
    } else if (req.params.genre == 'romance') {
        Movie.find({genre: /Romance/}).then(movies => res.render('store/items', {items: movies, isAuth: isAuth, isAdmin: isAdmin}));
    }
}

controller.item = (req,res) => {
    isAdmin = checkIsAdmin(req)
    isAuth = req.session.isAuth

    Movie.findById({_id: req.params._id}).then(movie => res.render('store/item', {movie: movie,  isAuth: isAuth, isAdmin: isAdmin}))
}


const checkIsAdmin = (req) =>{
    if (req.session.role == 'admin'){
        isAdmin = true
    } else {
        isAdmin = false
    }

    return isAdmin;
}
module.exports = controller