const RestaurantModel = require('../models/Restaurants');
const LocationModel = require('../models/Location');

exports.searchRestaurants = async (req, res, next) => {
    const search = new RegExp(req.query.search, 'i');
    const restaurants = await RestaurantModel.find({
        $or: [
            {name: search},
            {address: search},
            {tags: search}
        ]
    });
    return res.status(200).json(restaurants);
};

exports.getCurrentRestaurant = async (req, res, next) => {
    const curRest = await RestaurantModel.findById(req.query.id);
    return res.status(200).json(curRest);
}

exports.getAllRestaurants = async (req, res, next) => {
    const restaurants = await RestaurantModel.find()
    return res.status(200).json(restaurants);
};

exports.test = async (req, res, next) => {
    const nearestPlaces = await LocationModel.find(
        {
            location:
                { $near:
                        {
                            $geometry: { type: "Point",  coordinates: [ -75.9667, 40.78 ] },
                            $minDistance: 0,
                            $maxDistance: 50000
                        }
                }
        }
    )
    const calcDistance = await LocationModel.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [ -73.9667, 40.78 ] },
                spherical: true,
                distanceField: "distance"
            }
        }
    ] )
    const test = await RestaurantModel.update(
        {},
        {
            $addToSet: {tags: 'veganvvvvvv'}
        },
        { multi: true })
    return res.status(200).json(test);
}