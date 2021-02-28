import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Services} from 'food-delivery-package';

const {RestaurantsService} = Services;

const ActionTypes = {
    SWITCH_DISPLAY: '[Restaurants] Switch Display',
    GET_ALL_RESTAURANTS: '[Restaurants] Get All Restaurants',
    SEARCH_RESTAURANT: '[Restaurants] Search Restaurant',
    GET_CURRENT_RESTAURANT: '[Restaurants] Get Current Restaurant',
    ADD_TO_CART: '[Restaurants] Add To Cart',
    REMOVE_ITEM_FROM_CART: '[Restaurants] Remove Item From Cart',
    FILTER_RESTAURANTS: '[Restaurants] Filter Restaurants',
    SAVE_TOTAL_PRICE: '[Restaurants] Save Total Price'
}

const getAllRestaurants = createAsyncThunk(ActionTypes.GET_ALL_RESTAURANTS, async (data) => {
    const response = await RestaurantsService.getAllRestaurants(data);
    return response.data;
});

const searchRestaurant = createAsyncThunk(ActionTypes.SEARCH_RESTAURANT, async (data) => {
    const response = await RestaurantsService.restaurantsSearch(data);
    return response.data;
});
const getCurrentRestaurant = createAsyncThunk(ActionTypes.GET_CURRENT_RESTAURANT, async (data) => {
    const response = await RestaurantsService.getCurrentRestaurant(data);
    return response.data;
})

const switchDisplay = createAction(ActionTypes.SWITCH_DISPLAY);
const addToCart = createAction(ActionTypes.ADD_TO_CART);
const removeFromCart = createAction(ActionTypes.REMOVE_ITEM_FROM_CART);
const filterRestaurant = createAction(ActionTypes.FILTER_RESTAURANTS);
const saveTotalPrice = createAction(ActionTypes.SAVE_TOTAL_PRICE)

const ActionCreators = {
    switchDisplay,
    getAllRestaurants,
    searchRestaurant,
    getCurrentRestaurant,
    addToCart,
    removeFromCart,
    filterRestaurant,
    saveTotalPrice
}

export {
    ActionTypes,
    ActionCreators,
}
