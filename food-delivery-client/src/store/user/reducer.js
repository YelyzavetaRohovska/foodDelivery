import {createSlice} from '@reduxjs/toolkit';
import {ActionCreators} from './actions';

const initialState = {
    isAuthorized: null,
    _id: '',
    name: '',
    email: '',
    phone: '',
    countryCode: '',
};

const USER_REDUCER = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [ActionCreators.setAuthorization.rejected]: (state, action) => {
            return {
                ...initialState,
                isAuthorized: false
            }
        },
        [ActionCreators.setAuthorization.pending]: (state, action) => {
            return {
                ...initialState,
                isAuthorized: null
            }
        },
        [ActionCreators.setAuthorization.fulfilled]: (state, action) => {
            return {
                ...initialState,
                isAuthorized: true
            }
        },
        [ActionCreators.getCurrentUser.fulfilled]: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        [ActionCreators.logoutUser.fulfilled]: (state, action) => {
            return {
                ...initialState,
                isAuthorized: false
            };
        },
        [ActionCreators.updateUser.fulfilled]: (state, action) => {
            return {
                ...state,
                customerID: action.payload
            };
        }
    }
});

export default USER_REDUCER;
