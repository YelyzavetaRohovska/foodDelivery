import {configureStore} from '@reduxjs/toolkit';
import USER_REDUCER from './user/reducer';
import AUTH_REDUCER from './authtorization/reducer';
import ORDER_REDUCER from './order/reducer';

const store = configureStore({
    reducer: {
        AUTH_REDUCER: AUTH_REDUCER.reducer,
        USER_REDUCER: USER_REDUCER.reducer,
        ORDER_REDUCER: ORDER_REDUCER.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
