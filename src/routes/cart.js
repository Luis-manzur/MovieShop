const router = require('express').Router();
const controller = require('../controllers/cart');
const authorization = require('../auth/index');

router.get('/add/:_id', authorization.isAuth, controller.create);

router.get('/',authorization.isAuth, controller.view);

router.post('/', authorization.isAuth, controller.pay);

module.exports = router