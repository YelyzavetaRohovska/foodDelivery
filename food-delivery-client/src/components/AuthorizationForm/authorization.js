import React, {useEffect} from 'react';
import {Components} from 'food-delivery-package';
import {connect} from 'react-redux';

import {ActionCreators} from '../../store/authtorization/actions';

import styles from './authorization.module.scss';

const {requestCode, setValueForField, resetFormFields} = ActionCreators;
const {Button, Input} = Components;


const Authorization = ({requestCode, setValueForField, resetFormFields, phone, countryCode, isAuthorized, history}) => {

    useEffect(() => {
        resetFormFields();
    }, [resetFormFields]);

    return (

        <div className={styles.authWrapper}>
            <div className={styles.authForm}>
                <h2>Sign In</h2>
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
                    }}/>
                <Button
                    onClick={async () => {
                        const resp = await requestCode({
                            phone: phone.substring(countryCode.length),
                            code: countryCode,
                            isRegistration: false
                        });
                        if (resp.error) {
                            alert('Smth went wrong, check, maybe you should register first ?');
                        } else {
                            history.push('/confirm-auth')
                        }
                    }
                    }
                >Sign In</Button>
            </div>
            <Button
                primaryButton
                onClick={() => {
                    history.push('/registration')
                }}
            >
                Sign Up
            </Button>
        </div>
    );
}

export default connect((state) => {
    const {AUTH_REDUCER} = state;
    const {phone, countryCode, isAuthorized} = AUTH_REDUCER;
    return {
        phone,
        countryCode,
        isAuthorized
    }
}, {
    requestCode,
    setValueForField,
    resetFormFields,
})(Authorization);
