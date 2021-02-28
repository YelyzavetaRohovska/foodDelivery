import {configureStore} from '@reduxjs/toolkit';
import USER_REDUCER from './user/reducer';
import RESTAURANT_REDUCER from './restaurants/reducer';
import AUTH_REDUCER from './authtorization/reducer';
import PAYMENT_REDUCER from './payment/reducer';

const store = configureStore({
    reducer: {
        AUTH_REDUCER: AUTH_REDUCER.reducer,
        USER_REDUCER: USER_REDUCER.reducer,
        RESTAURANT_REDUCER: RESTAURANT_REDUCER.reducer,
        PAYMENT_REDUCER: PAYMENT_REDUCER.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
