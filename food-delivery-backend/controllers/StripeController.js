const userService = require('../services/user.service');
const stripe = require('stripe')(process.env.STRIPE_API);

exports.createCustomer = async (req, res, next) => {
    if (!req.body.isRegistration) {
        return res.status(409).send('Payment already exist');
    }
    const {email, name} = req.user;
    const customer = await stripe.customers.create({
        email,
        name
    });
    const {status} = await userService.findAndUpdate({_id: req.user._id}, {customerID: customer.id});
    if (status === 'updated') {
        return res.status(200).json(customer.id)
    }
    res.status(500).send('Internal error');
}
exports.paymentIntent = async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.price,
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: req.user.email,
        setup_future_usage: 'off_session',
        customer: req.user.customerID,
    });
    res.status(200).json(paymentIntent.client_secret);
}
