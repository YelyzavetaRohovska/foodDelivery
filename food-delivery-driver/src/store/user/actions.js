import {createAsyncThunk} from '@reduxjs/toolkit';
import {Services} from 'food-delivery-package';

const {UserService} = Services;

const ActionTypes = {
    GET_CURRENT_USER: '[User] Get Current User',
    LOGOUT_USER: '[User] Logout User',
}

const getCurrentUser = createAsyncThunk(ActionTypes.GET_CURRENT_USER, async () => {
    const response = await UserService.getCurrentUser();
    return response.data;
});
const logoutUser = createAsyncThunk(ActionTypes.LOGOUT_USER, async () => {
    const response = await UserService.logoutUser();
    return response.data;
});
const updateUser = createAsyncThunk(ActionTypes.UPDATE_USER, async () => {
    const response = await UserService.updateUser();
    return response.data;
})

const ActionCreators = {
    getCurrentUser,
    logoutUser,
    updateUser
}

export {
    ActionTypes,
    ActionCreators,
}
