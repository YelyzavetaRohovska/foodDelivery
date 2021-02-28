const orderModel = require('../models/Orders');

exports.getOrder = async (req, res, next) => {
    try {
        const order = await orderModel.find(req.query.id || {});
        if (!order.length) {
            return res.status(500).send('nothing find');
        }
        return res.status(200).json(order)

    } catch (err) {
        return res.status(500).send(err)
    }
}
exports.createOrder = async (req, res, next) => {
    try {
        const order = await orderModel.create({
            ...req.body,
            phone: req.user.phone,
            name: req.user.name,
            customerID: req.user.customerID,
        });
        return res.status(200).send(order._id);
    } catch (err) {
        return res.status(500).send(err);
    }
}
exports.updateOrder = async (req, res, next) => {

}