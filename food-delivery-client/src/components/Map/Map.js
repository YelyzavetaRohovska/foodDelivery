import React, {useState} from 'react';
import {compose, withProps} from 'recompose';
import {Link} from 'react-router-dom';
import {GoogleMap, InfoWindow, Marker, withGoogleMap} from 'react-google-maps';
import RatingElem from '../RatingElem/RatingElem';

const Map = props => {

    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const restaurantsMarkers = props.restaurants.map(restaurant => (
        <Marker
            key={restaurant.name}
            position={restaurant.location}
            onClick={() => {
                setSelectedRestaurant(restaurant)
            }}
        />
    ))

    const currentPositionMarker = (
        <Marker
            position={props.center}
            icon={{url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}}
        />
    );
    const restaurantInfo = selectedRestaurant && (
        <InfoWindow
            position={selectedRestaurant.location}
            onCloseClick={() => {
                setSelectedRestaurant(null);
            }}
            options={{
                pixelOffset: new window.google.maps.Size(0, -25)
            }}
        >
            <Link to={`/restaurant/${selectedRestaurant._id}`}>
                <h3>{selectedRestaurant.name}</h3>
                <p>{selectedRestaurant.description}</p>
                <RatingElem
                    rating={selectedRestaurant.rating}
                    size="15px"
                    spacing="1px"
                />
            </Link>
        </InfoWindow>
    );

    return (
        <GoogleMap defaultZoom={14} defaultCenter={props.center}>
            {currentPositionMarker}
            {restaurantsMarkers}
            {restaurantInfo}
        </GoogleMap>
    );
};

const WrappedMap = compose(
    // In these elements the google map itself will be placed
    withProps({
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    // withScriptjs,
    withGoogleMap
)(props => <Map {...props} />);

export default WrappedMap;