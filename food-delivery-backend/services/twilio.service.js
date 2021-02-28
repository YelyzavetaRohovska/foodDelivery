const util = require('util');
const authy = require("authy")(process.env.TWILIO_API_KEY);

class TwilioService {
    sendCode = async (phone, countryCode) => {
        const resp = util.promisify(authy.phones().verification_start)
        try {
            return await resp(phone, countryCode, "sms")
        } catch (e) {
            return e
        }
    }
    checkCode = async (phone, countryCode, verifyCode) => {
        const verificationCheck = util.promisify(authy.phones().verification_check);
        try {
            return await verificationCheck(phone, countryCode, verifyCode);
        } catch (e) {
            return e;
        }
    }
}

module.exports = new TwilioService();