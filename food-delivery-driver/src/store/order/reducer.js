import {createSlice} from '@reduxjs/toolkit';
import {ActionCreators} from './actions';

const initialState = {
    orders: [],
};

const ORDER_REDUCER = createSlice({
    name: 'payment',
    initialState,
    extraReducers: {
        [ActionCreators.getAllOrders.fulfilled]: (state, action) => {
            return {
                ...state,
                orders: [...action.payload]
            }
        },
    }
});

export default ORDER_REDUCER;
