const router = require('express').Router();
const controller = require('../controllers/admin')
const authorization = require('../auth/index');

router.get('/', authorization.isAdmin, controller.landing);

router.get('/users', authorization.isAdmin, controller.listUsers);

router.get('/movies', authorization.isAdmin, controller.listMovies);

router.get('/add-movie', authorization.isAdmin, controller.addMovie);

router.post('/add-movie', authorization.isAdmin, controller.saveMovie);

router.get('/delete-movie/:_id', authorization.isAdmin, controller.deleteMovie);

router.get('/edit-movie/:_id', authorization.isAdmin, controller.editMovie);

router.post('/edit-movie/:_id', authorization.isAdmin, controller.updateMovie);

router.get('/lose-admin/:_id', authorization.isAdmin, controller.removeAdmin);

router.get('/make-admin/:_id', authorization.isAdmin, controller.makeAdmin);

router.get('/orders', authorization.isAdmin, controller.listOrders)

module.exports = router