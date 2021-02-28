import {createSlice} from '@reduxjs/toolkit';
import {ActionCreators} from './actions';

const initialState = {
    id: '',
    customerSecret: ''
};

const PAYMENT_REDUCER = createSlice({
    name: 'payment',
    initialState,
    extraReducers: {
        [ActionCreators.createCustomer.fulfilled]: (state, action) => {
            return {
                ...state,
                id: action.payload.data
            }
        },
        [ActionCreators.getSecret.fulfilled]: (state, action) => {
            return {
                ...state,
                customerSecret: action.payload.data
            };
        },
        [ActionCreators.fillField]: (state, action) => {
            return {
                ...state,
                [action.payload.field]: {
                    value: action.payload.value,
                    error: action.payload.error || null
                }
            }
        }
    }
});

export default PAYMENT_REDUCER;
