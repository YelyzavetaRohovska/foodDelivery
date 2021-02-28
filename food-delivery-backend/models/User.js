let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'user'
    },
    email: String,
    phone: String,
    countryCode: String,
    name: String,
    customerID: ''
})
module.exports = mongoose.model('User', userSchema);
