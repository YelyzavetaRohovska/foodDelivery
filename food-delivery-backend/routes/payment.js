const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const stripeController = require('../controllers/StripeController');

router.post('/create-customer', authMiddleware.checkToken, stripeController.createCustomer)

router.post('/intent', authMiddleware.checkToken, stripeController.paymentIntent);

module.exports = router;
