import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import {Components} from 'food-delivery-package';

import styles from './auth.module.scss';

const Auth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const singInPopup = async () => {
       await firebase.auth().signInWithPopup(provider).then(res=>console.log(res))
    }
    return (
        <div>
            <h2>Authorize</h2>
            <button onClick={singInPopup}>sing in</button>
        </div>
    )
};

export default Auth;
