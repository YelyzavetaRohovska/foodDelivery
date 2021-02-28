const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/logout', userController.logoutUser);
router.put('/update', authMiddleware.checkToken, userController.updateUser)
router.get('/', authMiddleware.checkToken, userController.getUser);

module.exports = router;
