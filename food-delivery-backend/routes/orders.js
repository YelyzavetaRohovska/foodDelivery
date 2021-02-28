const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/OrderController');

router.post('/create', authMiddleware.checkToken, orderController.createOrder);

router.post('/update', authMiddleware.checkToken, (req, res, next) => {

});
router.get('/', orderController.getOrder);

module.exports = router;
