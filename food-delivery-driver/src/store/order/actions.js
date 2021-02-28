import {createAsyncThunk} from '@reduxjs/toolkit';
import {Services} from 'food-delivery-package';

const {OrdersService} = Services;

const ActionTypes = {
    GET_ORDERS: '[Orders] Get All Orders',
}

const getAllOrders = createAsyncThunk(ActionTypes.GET_ORDERS, async () => {
    const response = await OrdersService.getOrder('');
    return response.data;
});

const ActionCreators = {
    getAllOrders
}

export {
    ActionTypes,
    ActionCreators,
}
