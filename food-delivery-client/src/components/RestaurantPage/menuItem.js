import React from 'react';
import {connect} from "react-redux";
import {ActionCreators} from '../../store/restaurants/action';

import * as styles from './restaurant-page.module.scss';

import {Components} from 'food-delivery-package';

const {Button} = Components;
const {addToCart, increaseCounter} = ActionCreators;


const MenuItem = ({addToCart, restID, dishes, addedProducts}) => {
    const addProduct = (dish) => {
        addToCart(dish);
    }

    return (
        <div className={styles.itemWrapper}>
            {dishes && dishes.length === 0 && <div>Nothing Here :(</div>}
            {dishes && dishes.map((item, index) => (
                <div
                    className={styles.dishWrapper}
                    key={`${index}_${Math.random()}`}>
                    <div>
                        <div className={styles.productImageBlock}>
                            <img src={item.img} alt={item.name}/>
                        </div>
                        <ul className={styles.productCapacity}>
                            <li>{item.size}</li>
                            <li>{item.price}</li>
                        </ul>
                    </div>
                    <div className={styles.itemWrapper}>
                        <p>{item.description}</p>
                        <div className={styles.combineBtn}>
                            <Button
                                onClick={() => addProduct(item)}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default connect((state) => {
    const {RESTAURANT_REDUCER} = state;
    const {addedProducts, currentRestaurant} = RESTAURANT_REDUCER
    return {
        addedProducts,
        currentRestaurant
    }
}, {
    addToCart,
    increaseCounter
})(MenuItem);
