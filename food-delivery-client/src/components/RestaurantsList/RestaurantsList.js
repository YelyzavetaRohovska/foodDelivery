import React from 'react';
import RestaurantView from '../RestaurantView/RestaurantView';

import styles from './RestaurantsList.module.scss';

const RestaurantsList = props => {

    const {data} = props;

    const restaurantsElements = data.map(restaurant => (
            <RestaurantView {...restaurant} key={restaurant.name}/>
        )
    );

    return (
        <div className={styles.RestaurantsList}>
            {restaurantsElements}
        </div>
    );
};

export default RestaurantsList;