import React from 'react';
import StarRatings from 'react-star-ratings';

import styles from './RatingElem.module.scss';

const RatingElem = (props) => {

    const ratingNumber = +parseFloat(props.rating).toFixed(1);

    return (
        <div className={styles.RatingElem}>
            <StarRatings
                {...props}
                rating={ratingNumber}
                starRatedColor="orange"
                starDimension={props.size ?? '30px'}
                starSpacing={props.spacing ?? '5px'}
                name='rating'
            />
        </div>
    );
};

export default RatingElem;
