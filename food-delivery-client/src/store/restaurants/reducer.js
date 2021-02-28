import {createSlice} from '@reduxjs/toolkit';
import {ActionCreators} from './action';

const initialState = {
    displayType: 'list',
    searchedRestaurants: [],
    restaurants: [],
    currentRestaurant: {},
    addedProducts: [],
    filteredDishes: [],
};

const RESTAURANT_REDUCER = createSlice({
    name: 'restaurant',
    initialState,
    extraReducers: {
        [ActionCreators.switchDisplay]: (state) => {
            return {
                ...state,
                displayType: state.displayType === 'list' ? 'map' : 'list'
            }
        },
        [ActionCreators.getAllRestaurants.fulfilled]: (state, action) => {
            return {
                ...state,
                restaurants: action.payload
            };
        },
        [ActionCreators.searchRestaurant.fulfilled]: (state, action) => {
            return {
                ...state,
                searchedRestaurants: action.payload
            };
        },
        [ActionCreators.getCurrentRestaurant.fulfilled]: (state, action) => {
            return {
                ...state,
                currentRestaurant: action.payload
            };
        },
        [ActionCreators.addToCart]: (state, action) => {
            return {
                ...state,
                addedProducts: [
                    ...state.addedProducts,
                    action.payload
                ]
            };
        },
        [ActionCreators.saveTotalPrice]: (state, action) => {
            return {
                ...state,
                totalPrice: action.payload
            }
        },
        [ActionCreators.removeFromCart]: (state, action) => {
            const {index} = action.payload;
            const addedProducts = [...state.addedProducts].filter((item, ind) => ind !== index);
            return {
                ...state,
                addedProducts
            }
        },
        [ActionCreators.filterRestaurant]: (state, action) => {
            const filteredDishes = [...state.currentRestaurant.dishes].filter((item) =>
                item.tag.some((tag) => action.payload.includes(tag))
            );

            return {
                ...state,
                filteredDishes
            }
        },
    }
});

export default RESTAURANT_REDUCER;


