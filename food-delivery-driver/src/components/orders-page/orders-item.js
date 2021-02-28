import React, {useEffect, useState} from 'react';
import io from "socket.io-client";

import {Components} from 'food-delivery-package';

import styles from './order-page.module.scss';

const {Button} = Components;

const OrderItem = ({orders}) => {
    const [socket] = useState(io('http://localhost:8000'));

    const acceptOrder = (order_id, driver_id) => {
        socket.emit('accept-order', {
            driver: driver_id,
            order: order_id
        })
    }

    return (
        <>
            {orders && orders.map((item) => (
                <div className={styles.itemWrap}>
                    <h2>{item._id}</h2>
                    {item.restaurantsID.map((item) =>
                        <p>
                            {item}
                        </p>
                    )}
                    <p>{item.address}</p>
                    <p>{item.price}</p>
                    <Button
                        onClick={() => acceptOrder(item._id, 'mytestdriver1')}
                    >
                        Accept
                    </Button>
                </div>
            ))}
        </>
    );
};

export default OrderItem;
