import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from "../../store/restaurants/action";

import styles from './MainPage.module.scss';

import Map from '../Map/Map';
import {Components} from 'food-delivery-package';
import RestaurantsList from '../RestaurantsList/RestaurantsList';
import MapListSwitch from '../MapListSwitch/MapListSwitch';

const {switchDisplay, getAllRestaurants, searchRestaurant} = ActionCreators;
const {Input} = Components;

const MainPage = (props) => {
    const {getAllRestaurants, searchRestaurant, switchDisplay, restaurants, searchedRestaurants, displayType} = props;

    const [searchValue, setSearchValue] = useState('');
    const [userPosition, setUserPosition] = useState({});
    const [restForRender, setRest] = useState(restaurants);

    const load = async () => {
        await getAllRestaurants();
    }
    useEffect(() => {
        load();
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                setUserPosition({lat: position.coords.latitude, lng: position.coords.longitude});
            }, () => {
                console.log('unable to load geolocation');
            });
        }
    }, []);
    useEffect(() => {
        if (searchedRestaurants.length === 0) {
            setRest(restaurants);
        } else {
            setRest(searchedRestaurants);
        }
    }, [searchedRestaurants, restaurants])


    const searchClickedHandler = async (e) => {
        if (!e.target.value) {
            getAllRestaurants();
        }
        setSearchValue(e.target.value);
        await searchRestaurant({
            searchValue: e.target.value.toLowerCase()
        });
    };
    const content = displayType === 'list'
        ? <RestaurantsList data={restForRender}/>
        : <Map
            isMarkerShown
            restaurants={restForRender}
            center={userPosition}
        />

    return (
        <div className={styles.Content}>
            <Input
                type="text"
                value={searchValue}
                onChange={searchClickedHandler}
                placeholder="Search..."
            />
            <MapListSwitch onClick={switchDisplay} display={displayType}/>
            <main className={styles.MainContent}>
                {content}
            </main>
        </div>
    );
};

export default connect((state) => {
    const {RESTAURANT_REDUCER} = state;
    const {restaurants, displayType, searchedRestaurants} = RESTAURANT_REDUCER;
    return {
        restaurants,
        displayType,
        searchedRestaurants
    }
}, {
    switchDisplay,
    getAllRestaurants,
    searchRestaurant
})(MainPage);
