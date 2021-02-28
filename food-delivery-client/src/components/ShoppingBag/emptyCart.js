import React from 'react';
import Cart from '../../img/empty-cart.png'

import * as styles from './shoppingBag.module.scss'

import {Components} from 'food-delivery-package';
import {Link} from "react-router-dom";

const {Input, Button} = Components;

const EmptyCart = () => {

    return (
        <div className={styles.emptyCart}>
            <img src={Cart}/>
            <p>Oops... Its looks like your cart empty :(</p>
            <Link to='/'>
                <Button>
                    Find Dinner!!!
                </Button>
            </Link>
        </div>
    );
};

export default EmptyCart;