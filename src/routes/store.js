const router = require('express').Router();
const controller = require('../controllers/store')

router.get('/',  controller.listMovies);

router.get('/genre/:genre', controller.listGenreMovies);

module.exports = router