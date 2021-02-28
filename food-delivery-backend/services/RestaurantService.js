const RestaurantService = require('../models/Restaurants');

class restaurant {
    // constructor() {
    //
    // }

    async getAllRestaurants() {
        const restaurants = await RestaurantService.find();
        return restaurants;
    }
}

module.exports = restaurant;