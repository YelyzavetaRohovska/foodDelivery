import React from 'react';

import * as styles from './shoppingBag.module.scss'

import {Components} from 'food-delivery-package';

const {Input, Button} = Components;

const CartItem = ({removeItem, products}) => {

    return (
        products.map((item, index) => (
            <div
                key={index+Math.random()}
                className={styles.itemWrap}
            >
                <button
                    className={styles.close}
                    onClick={() => removeItem({index})}
                >x
                </button>
                <div className={styles.productImg}>
                    <img src={item.img} alt={item.name}/>
                </div>
                <div className={styles.descBlock}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
                <div className={styles.actionsBlock}>
                    <Input
                        type="text"
                        value={item.price}
                        disabled
                    />
                </div>
            </div>
        ))
    );
};

export default CartItem;