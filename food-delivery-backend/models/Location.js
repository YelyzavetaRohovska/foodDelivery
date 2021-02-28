const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        }
    },
    category: String
})

module.exports = mongoose.model('Location', locationSchema);