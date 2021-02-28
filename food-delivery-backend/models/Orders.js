const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    price: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    restaurantsID: {
        type: [String],
        require: true
    },
    dishesId: {
        type: [String],
        require: true
    },
    driver: String,
    address: String,
    location: {
        lat: Number,
        lng: Number,
    },
    name: String,
    phone: {
        type: String,
        require: true
    },
    customerID: {
        type: String,
        require: true
    },
    deliveryTime: String
})
module.exports = mongoose.model('Order', orderSchema);
