const jwt = require('jsonwebtoken');

class TokenService {
    create = async (phone, countryCode) => {
        return await jwt.sign({phone, countryCode}, process.env.SALT);
    }
    decode = async (token) => {
        return await jwt.verify(token, process.env.SALT);
    }
}

module.exports = new TokenService();