import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Services} from 'food-delivery-package';

const {CustomerService} = Services;

const ActionTypes = {
    CREATE_CUSTOMER: '[Payment] Create Customer',
    GET_CUSTOMER_SECRET: '[Payment] Get Customer Secret',
    FILL_FIELD: '[Payment] Fill Field'
}

const createCustomer = createAsyncThunk(ActionTypes.CREATE_CUSTOMER, async (data) => {
    const response = await CustomerService.createCustomer(data);
    return response.data;
});
const getSecret = createAsyncThunk(ActionTypes.GET_CUSTOMER_SECRET, async (data) => {
    const response = await CustomerService.getCustomerSecret(data);
    return response;
});

const fillField = createAction(ActionTypes.FILL_FIELD);

const ActionCreators = {
    createCustomer,
    getSecret,
    fillField
}

export {
    ActionTypes,
    ActionCreators,
}
