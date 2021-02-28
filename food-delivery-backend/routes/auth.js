const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');


router.post('/requestCode', authController.requestCode);
router.post('/verifyCode', authController.verifyCode);

module.exports = router;
