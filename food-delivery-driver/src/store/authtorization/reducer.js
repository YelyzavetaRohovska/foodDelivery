import {createSlice} from '@reduxjs/toolkit';
import {ActionCreators} from './actions';

const initialState = {
    isAuthSuccess: false,
    token: '',
    _id: '',
    name: '',
    email: '',
    phone: '',
    countryCode: '',
    errors: {
        name: {
            errorTitle: 'Too short name',
            touched: false
        },
        email: {
            errorTitle: 'Please enter valid email',
            touched: false
        },
    }
};

const AUTH_REDUCER = createSlice({
    name: 'authorization',
    initialState,
    extraReducers: {
        [ActionCreators.verifyCode.fulfilled]: (state, action) => {
            return {
                ...state,
                isAuthSuccess: true
            }
        },
        [ActionCreators.verifyCode.rejected]: (state, action) => {
            return {
                ...state,
                isAuthSuccess: false

            }
        },
        [ActionCreators.requestCode.fulfilled]: (state) => {
            return state;
        },
        [ActionCreators.setTouched]: (state, action) => {
            const fieldName = action.payload.name;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [fieldName]: {
                        ...state.errors[fieldName],
                        touched: true
                    }
                }
            }
        },
        [ActionCreators.setValueForField]: (state, action) => {
            const fieldName = action.payload.name;
            return {
                ...state,
                [fieldName]: action.payload.value,
                errors: {
                    ...state.errors,
                    [fieldName]: {
                        ...state.errors[fieldName],
                        errorTitle: action.payload.error
                    }
                }
            }

        },
        [ActionCreators.resetFormFields]: (state) => {
            return initialState;
        },
    }
});

export default AUTH_REDUCER;
