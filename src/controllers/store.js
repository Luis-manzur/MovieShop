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
    Movie.find({type: req.params.genre} ).then(movies => res.render('store/items', {items: movies, isAuth: isAuth, isAdmin: isAdmin}));
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