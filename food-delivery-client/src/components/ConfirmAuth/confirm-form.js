import React, {useState} from 'react';
import {connect} from 'react-redux';

import styles from './confirm-auth.module.scss'

import {Components} from 'food-delivery-package';
import {ActionCreators as AuthActions} from "../../store/authtorization/actions";
import {ActionCreators as PaymentActions} from "../../store/payment/actions";

const {Input, Button} = Components;
const {verifyCode} = AuthActions;
const {createCustomer} = PaymentActions;

const ConfirmAuth = ({verifyCode, createCustomer, isAuthSuccess, phone, countryCode, email, name, history}) => {

    React.useEffect(() => {
        if (isAuthSuccess) {
            history.push('/');
        }
    }, [history, isAuthSuccess]);

    const [inputErr, setInputErr] = useState(false);

    const handleChange = async (e) => {
        if (e.target.value.length === 4) {
            const verifyResponse = await verifyCode({
                phone: phone.substring(countryCode.length),
                countryCode,
                email,
                name,
                verifyCode: e.target.value,
                isRegistration: !!email
            });
            if (verifyResponse.error) {
                return alert('Oooops, some errors with your verification');
            }
            await createCustomer({
                isRegistration: !!email
            });
        }
        if (e && e.target && e.target.value.length > 4) {
            setInputErr(true);
        }
    }
    return (
        <div className={styles.confWrapper}>
            <div className={styles.confForm}>
                <h2>Enter authorization code</h2>
                <Input
                    type="number"
                    placeholder="Write your code"
                    onChange={handleChange}
                    error={inputErr && "Max length is 4 symbols"}
                />
            </div>
            <Button onClick={() => history.goBack()}>Back</Button>
        </div>
    );
}

export default connect((state) => {
    const {AUTH_REDUCER} = state;
    const {phone, countryCode, isAuthSuccess, email, name} = AUTH_REDUCER;
    return {
        phone,
        countryCode,
        isAuthSuccess,
        email,
        name
    }
}, {
    verifyCode,
    createCustomer
})(ConfirmAuth);
