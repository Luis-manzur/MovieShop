const router = require('express').Router();
const controller = require('../controllers/auth')
const authorization = require('../auth/index');

router.get('/register', controller.addUser);

router.get('/login', controller.login);

router.post('/register', controller.saveUser);

router.post('/login', controller.authenticate);

router.get('/logout', authorization.isAuth, controller.logout);

module.exports = router