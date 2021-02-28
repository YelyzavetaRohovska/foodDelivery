const express = require('express');
const router = express.Router();
const usersRouter = require('./user');
const authRouter = require('./auth');
const restaurantsRouter = require('./restaurants');
const paymentRouter = require('./payment')
const ordersRouter = require('./orders');

module.exports = () => {
    router.use('/user', usersRouter);
    router.use('/auth', authRouter);
    router.use('/restaurants', restaurantsRouter);
    router.use('/payment', paymentRouter);
    router.use('/orders', ordersRouter);
    return router;
};
