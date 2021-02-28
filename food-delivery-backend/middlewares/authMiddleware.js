const userService = require('../services/user.service');
const tokenService = require('../services/tokenService');

exports.checkToken = async (req, res, next) => {
    const token = req.cookies['token'];
    if (token) {
        const {countryCode, phone} = await tokenService.decode(token);
        const {users, status} = await userService.find({phone, countryCode});
        if (status === 'found') {
            req.user = users[0];
            return next();
        }
        return res.status(500).send('Incorrect token')
    }
    return res.status(403).send('Token is not exist')
}
