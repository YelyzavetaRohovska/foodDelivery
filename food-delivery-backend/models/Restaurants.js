const mongoose = require('mongoose');

const dishesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Dish must have a name'],
        trim: true,
    },
    tag: [],
    description: String,
    price: {
        type: String,
        required: [true, 'Price is important part of dish description']
    },
    size: String,
    img: String,
});

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Restaurant must have a name'],
        unique: true,
        trim: true
    },
    description: String,
    rating: Number,
    location: {
        lat: {
            type: Number,
            required: [true, 'Restaurant must have a latitude coordinate']
        },
        lng: {
            type: Number,
            required: [true, 'Restaurant must have a longitude coordinate']
        }
    },
    address: {
        type: String,
        default: 'not specified'
    },
    owner: String,
    tags: [String],
    dishes: [dishesSchema],
    image: String,
    restID: String
});

module.exports = mongoose.model('Restaurants', restaurantSchema);