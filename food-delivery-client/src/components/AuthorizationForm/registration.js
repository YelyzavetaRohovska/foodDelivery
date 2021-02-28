import React from 'react';
import {connect} from 'react-redux';
import {Components} from 'food-delivery-package';
import firebase from '../../firebase.js';
import {emailError, nameError} from '../../helpers/validation';
import {ActionCreators} from '../../store/authtorization/actions';

import styles from './authorization.module.scss';

const {requestCode, setTouched, setValueForField, resetFormFields} = ActionCreators;
const {Button, Input} = Components;


const Registration = ({requestCode, setTouched, setValueForField, resetFormFields, phone, countryCode, email, name, errors, isAuthorized, history}) => {

    const addUser = () => {
        const usersRef = firebase.database().ref('users');
        usersRef.push({
            phone: phone.substring(countryCode.length),
            code: countryCode,
            email,
            name
        });
    }

    React.useEffect(() => {
        resetFormFields();
    }, [isAuthorized, resetFormFields])

    return (
        <div className={styles.authWrapper}>
            <div className={styles.authForm}>
                <h2>Sign Up</h2>
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onBlur={(e) => setTouched({name: 'name'})}
                    onChange={e => setValueForField({
                        name: 'name',
                        value: e.target.value,
                        error: nameError(e.target.value)
                    })}
                    error={errors.name.touched && errors.name.errorTitle}
                />
                <Input
                    type="email"
                    placeholder="Write your email"
                    value={email}
                    onBlur={(e) => setTouched({name: 'email'})}
                    onChange={(e) => setValueForField({
                        name: 'email',
                        value: e.target.value,
                        error: emailError(e.target.value)
                    })}
                    error={errors.email.touched && errors.email.errorTitle}
                />
                <Input
                    phoneInput
                    value={phone}
                    onChange={(value, country) => {
                        setValueForField({
                            name: 'phone',
                            value: value
                        });
                        setValueForField({
                            name: 'countryCode',
                            value: country.dialCode
                        })
                    }}
                />
                <Button
                    onClick={async () => {
                        const resp = await requestCode({
                            phone: phone.substring(countryCode.length),
                            code: countryCode,
                            isRegistration: true
                        });
                        addUser();
                        if (resp.error) {
                            alert("Smth went wrong, check, maybe you've already logged in first ?");
                        } else {
                            history.push('/confirm-auth')
                        }
                    }}
                    disabled={errors.email.errorTitle || errors.name.errorTitle}
                >
                    Sign Up
                </Button>
            </div>
            <Button
                onClick={() => history.push('/login')}
                primaryButton
            >
                Back to Sign In
            </Button>
        </div>
    );
}

export default connect((state) => {
    const {AUTH_REDUCER} = state;
    const {name, phone, countryCode, email, errors, isAuthorized} = AUTH_REDUCER;
    return {
        name,
        phone,
        countryCode,
        email,
        errors,
        isAuthorized,
    }
}, {
    requestCode,
    setTouched,
    setValueForField,
    resetFormFields,
})(Registration);
