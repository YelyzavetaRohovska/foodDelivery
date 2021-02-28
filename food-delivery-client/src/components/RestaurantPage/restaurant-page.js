import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../store/restaurants/action';
import BackArrow from '../../img/next.svg';

import * as styles from './restaurant-page.module.scss';

import MenuItem from './menuItem';

const {getCurrentRestaurant, filterRestaurant} = ActionCreators;


const RestaurantPage = ({getCurrentRestaurant, filterRestaurant, currentRestaurant, filteredDishes, history}) => {

    const [filters, setFilters] = useState({all: true});

    const load = async () => {
        await getCurrentRestaurant({
            id: history.location.pathname.slice(12)
        })
    }
    useEffect(() => {
        load();
    }, []);

    const addFilter = (value, key) => {
        const newFilters = {...filters};
        delete newFilters.all;
        if (typeof filters[value] === 'number') {
            delete newFilters[value];
            if (Object.keys(newFilters).length === 0) {
                setFilters({
                    all: true
                })
                filterRestaurant([null])
            } else {
                setFilters({
                    ...newFilters
                });
                filterRestaurant(Object.keys(newFilters))
            }
        } else {
            setFilters({
                ...newFilters,
                [value]: key,
            })
            filterRestaurant(Object.keys({
                ...newFilters,
                [value]: key,
            }))
        }
    }
    return (
        <div className={styles.wrapper}>
            <div
                className={styles.backBtn}
                onClick={() => history.goBack()}
            >
                <img src={BackArrow}/>
            </div>
            <div className={styles.pageHeader}>
                <div className={styles.profileImg}>
                    <img src={currentRestaurant.image}/>
                </div>
                <div>
                    <h2>
                        {currentRestaurant.name}
                    </h2>
                </div>
            </div>
            <nav>
                <ul className={styles.categoryList}>
                    <li
                        className={`${styles.categoryItem} ${filters.all === true && styles.activeNav}`}
                        onClick={() => setFilters({'all': true})}
                    >All
                    </li>
                    {currentRestaurant.tags && currentRestaurant.tags.map((category, index) => (
                        <li
                            key={index}
                            className={`${styles.categoryItem} ${filters[category] === index && styles.activeNav}`}
                            onClick={() => {
                                addFilter(category, index);
                            }}
                        >{category}</li>
                    ))}
                </ul>
            </nav>
            <MenuItem
                dishes={filters.all ? currentRestaurant.dishes : filteredDishes}
                restID={currentRestaurant._id}
            />
        </div>
    );
};

export default connect((state) => {
    const {RESTAURANT_REDUCER} = state;
    const {currentRestaurant, filteredDishes} = RESTAURANT_REDUCER;
    return {
        currentRestaurant,
        filteredDishes
    }
}, {
    getCurrentRestaurant,
    filterRestaurant
})(RestaurantPage);
