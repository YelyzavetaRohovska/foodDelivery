import React, {useEffect} from 'react';
import {connect, useSelector} from "react-redux";
import {loadStripe} from '@stripe/stripe-js';
import {ActionCreators} from '../../store/payment/actions';
import {Elements} from '@stripe/react-stripe-js';

import CardForm from './checkoutForm';

const {getSecret} = ActionCreators;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const OrderMakePage = ({getSecret, customerSecret, history}) => {
    const totalPrice = useSelector(state =>
        state.RESTAURANT_REDUCER.totalPrice
    );
    useEffect(() => {
        if (!totalPrice) {
            history.goBack();
        } else {
            getSecret({
                price: totalPrice,
            })
        }
    }, [getSecret, history, totalPrice]);

    return (
        <Elements
            stripe={stripePromise}>
            <CardForm customerSecret={customerSecret} history={history}/>
        </Elements>
    );
};

export default connect((state) => {
    const {RESTAURANT_REDUCER, PAYMENT_REDUCER} = state;
    const {addedProducts} = RESTAURANT_REDUCER;
    const {customerSecret} = PAYMENT_REDUCER;
    return {
        addedProducts,
        customerSecret
    }
}, {
    getSecret
})(OrderMakePage);