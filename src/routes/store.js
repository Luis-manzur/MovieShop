const router = require('express').Router();
const controller = require('../controllers/store')

router.get('/',  controller.listMovies);

router.get('/genre/:genre', controller.listGenreMovies);

router.get('/item/:_id', controller.item);

module.exports = router