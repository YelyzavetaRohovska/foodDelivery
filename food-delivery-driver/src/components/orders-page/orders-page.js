import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from "../../store/order/actions";

import {Components} from 'food-delivery-package';
import OrderItem from './orders-item';

import styles from './order-page.module.scss';

const {getAllOrders} = ActionCreators;
const {Input} = Components;

const OrderPage = ({getAllOrders, orders}) => {

    const load = async () => {
        await getAllOrders();
    }
    useEffect(() => {
        load();
    }, []);

    return (
        <div className={styles.wrap}>
            <OrderItem orders={orders}/>
        </div>
    );
};

export default connect((state) => {
    const {ORDER_REDUCER} = state;
    const {orders} = ORDER_REDUCER;
    return {
        orders
    }
}, {
    getAllOrders
})(OrderPage);
