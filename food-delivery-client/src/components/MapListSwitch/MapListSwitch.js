import React from 'react';

import styles from './MapListSwitch.module.scss';

const MapListSwitch = props => {

    return (
        <div className={styles.MapListSwitch} onClick={props.onClick}>
            Switch to {props.display === 'list' ? 'map' : 'list'}
        </div>
    );
};

export default MapListSwitch;