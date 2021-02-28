import React from 'react';

import * as styles from '../RestaurantPage/restaurant-page.module.scss';

const PreviewDishes = ({deleteItem, dishes}) => {

    return (
        <div className={styles.itemWrapper}>
            {dishes && dishes.map((item, index) => (
                <div
                    className={styles.dishWrapper}
                    key={`${index}_${Math.random()}`}>
                    <button
                        onClick={() => deleteItem('dishes', item)}
                    >
                        Delete
                    </button>
                    <div className={styles.wrapperBlock}>
                        <div className={styles.productImageBlock}>
                            <img src={item.img}/>
                        </div>
                        <ul className={styles.productCapacity}>
                            <li>{item.size}</li>
                            <li>{item.price}</li>
                        </ul>
                    </div>
                    <div className={styles.itemWrapper}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PreviewDishes;
