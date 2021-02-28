const userService = require('../services/user.service');
const twilioService = require('../services/twilio.service');
const tokenService = require('../services/tokenService');
const firebase = require('firebase');

exports.requestCode = async (req, res, next) => {
    // const {phone, code, isRegistration} = req.body;
    // const {status} = await userService.find({phone, countryCode: code})
    // if (status === 'internal error') {
    //     return res.status(503).send(status)
    // }
    // if (status === 'found' && isRegistration) {
    //     return res.status(500).send('You already have an account');
    // }
    // if (status === 'not found' && !isRegistration) {
    //     return res.status(500).send('You should register first');
    // }
    // const attempt = await twilioService.sendCode(phone, code);
    // if (attempt.success) {
        return res.status(200).send('code sent')
    // }
    // return res.status(503).send('internal error');
};

exports.verifyCode = async (req, res, next) => {
    const {phone, countryCode, name, email, isRegistration, verifyCode} = req.body;
    const token = await tokenService.create(phone, countryCode);
    // const attempt = await twilioService.checkCode(phone, countryCode, verifyCode);
    // if (!attempt.success) {
    //     return res.status(401).send('incorrect code');
    // }
    if (isRegistration) {
        const {users, status} = await userService.create({
            phone,
            countryCode,
            name,
            email
        })
        res.cookie('token', token, {
            httpOnly: true
        });
        return res.status(200).json({user: users[0], status});
    }

    const {users, status} = await userService.find({phone, countryCode});
    if (status === 'found') {
        res.cookie('token', token, {
            httpOnly: true
        });
        return res.status(200).json({user: users[0], success: true});
    }

    res.status(500).send('internal error')
}
