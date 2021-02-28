import React from 'react';
import RatingElem from '../RatingElem/RatingElem';

import styles from './RestaurantView.module.scss';
import {Link} from "react-router-dom";

const RestaurantView = props => {

    const {name, description, rating, image, _id} = props;

    return (
        <div className={styles.wrapper}>
            <Link to={`/restaurant/${_id}`}>
                <div
                    className={styles.RestaurantView}
                >
                    <div className={styles.boxColumed}>
                        <div className={styles.imgWrapper}>
                            <img src={image}/>
                        </div>
                        <RatingElem
                            rating={rating}
                            size="18px"
                            spacing="1px"
                        />
                    </div>
                    <div className={styles.boxColumed}>
                        <h3>{name}</h3>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RestaurantView;