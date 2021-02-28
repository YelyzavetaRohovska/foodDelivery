import React from 'react';
import {connect} from "react-redux";
import {ActionCreators as RestaurantActions} from '../../store/restaurants/action';
import * as styles from './shoppingBag.module.scss'
import {Components} from 'food-delivery-package';
import CartItem from './shoppingItems';
import EmptyCart from './emptyCart';

const {removeFromCart, increaseCounter, saveTotalPrice} = RestaurantActions;
const {Button} = Components;

const Cart = ({removeFromCart, increaseCounter, saveTotalPrice, addedProducts, history}) => {
    let totalPrice = addedProducts.reduce(function (sum, current) {
        return sum + parseInt(current.price);
    }, 0);

    return (
        <div className={styles.wrapper}>
            {addedProducts.length === 0 ? <EmptyCart/> :
                <>
                    <CartItem
                        removeItem={removeFromCart}
                        changeCount={increaseCounter}
                        products={addedProducts}
                    />
                    <p className={styles.totalPrice}>
                        Total Price: <span>{totalPrice}</span>
                    </p>
                    <Button
                        onClick={() => {
                            saveTotalPrice(totalPrice);
                            history.push('/make-order');
                        }}
                    >Order Now</Button>
                </>
            }
        </div>
    );
};

export default connect((state) => {
    const {RESTAURANT_REDUCER} = state;
    const {addedProducts} = RESTAURANT_REDUCER;
    return {
        addedProducts
    }
}, {
    removeFromCart,
    increaseCounter,
    saveTotalPrice
})(Cart);