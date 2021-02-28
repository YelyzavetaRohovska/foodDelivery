const userService = require('../services/user.service');

exports.getUser = async (req, res, next) => {
    res.status(200).json(req.user);
}
exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token', '');
    res.status(200).send('token is cleared');
}
exports.updateUser = async (req, res, next) => {
    const {status} = await userService.findAndUpdate(req.body.filter, req.body.update);
    if (status === 'updated') {
        return res.status(200).send('updated');
    }
    return res.status(500).send('Internal error')
}