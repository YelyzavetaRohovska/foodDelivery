import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import io from 'socket.io-client';
import {ActionCreators} from '../../store/user/actions';
import MapDirection from "./map-direction";

import * as styles from './order-staus.module.scss';

const {getCurrentUser} = ActionCreators;

const OrderStatusPage = ({getCurrentUser}) => {
    const [socket] = useState(io('http://localhost:8000'));
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({})

    useEffect(() => {
        console.log('fsdsd')
        socket.emit('init', 'customerID');
    }, []);

    socket.on('accepted', (order) => {
        setLoading(false);
        setOrder(order);
    });
    return (
        <div>
            {loading && <div className={styles.loading}>Waiting accepting your order...</div>}
            <h2>Your Order Details:</h2>
            <MapDirection/>
            <p>Order ID: {order._id}</p>
            <p>Courier: {order.driver} </p>
            <p>Waiting time: {30+Math.floor(Math.random()*10)} min</p>
            <p>Total price: {order.price}</p>
        </div>
    )
};

export default connect(null, {
    getCurrentUser
})(OrderStatusPage)