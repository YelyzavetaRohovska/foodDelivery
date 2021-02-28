const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/RestaurantController');

router.get('/search', restaurantController.searchRestaurants)

router.get('/current', restaurantController.getCurrentRestaurant)

router.get('/test', restaurantController.test)

router.get('/', restaurantController.getAllRestaurants);

module.exports = router;