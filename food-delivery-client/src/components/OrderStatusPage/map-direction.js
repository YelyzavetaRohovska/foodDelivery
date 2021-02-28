import React from 'react';
import {GoogleMap, DirectionsRenderer, withGoogleMap} from 'react-google-maps';
import {compose, withProps, lifecycle} from 'recompose';

/* global google */

const MapDirection = compose(
    withProps({
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withGoogleMap,
    lifecycle({
        componentDidMount() {

            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(41.8507300, -87.6512600),
                destination: new google.maps.LatLng(41.8525800, -87.6514100),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)((props) =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={{lat: -34.397, lng: 150.644}}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
)

export default MapDirection;