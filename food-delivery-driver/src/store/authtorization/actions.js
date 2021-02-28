import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Services} from 'food-delivery-package';

const {AuthService} = Services;

const ActionTypes = {
    REGISTER_USER: '[User] Register User',
    CONFIRM_USER_REGISTRATION: '[User] Confirm User Registration',
    SEND_CODE: '[User] Send Code',
    SET_TOUCHED_FIELD: '[User] Set Touched field',
    SET_VALUE_FOR_FIELD: '[User] Set Value For field',
    RESET_FORM: '[User] Reset Form Fields',
}

const verifyCode = createAsyncThunk(ActionTypes.CONFIRM_USER_REGISTRATION, async (data) => {
    const response = await AuthService.verifyCode(data);
    return response.data;
});

const requestCode = createAsyncThunk(ActionTypes.SEND_CODE, async (data) => {
    const response = await AuthService.requestCode(data);
    return response.data
});

const setTouched = createAction(ActionTypes.SET_TOUCHED_FIELD);

const setValueForField = createAction(ActionTypes.SET_VALUE_FOR_FIELD);
const resetFormFields = createAction(ActionTypes.RESET_FORM);

const ActionCreators = {
    verifyCode,
    requestCode,
    setTouched,
    setValueForField,
    resetFormFields,
}

export {
    ActionTypes,
    ActionCreators,
}
