import React, {useState} from 'react';
import {connect} from "react-redux";

import {ActionCreators} from '../../store/payment/actions';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {CARD_ELEMENT_OPTIONS} from '../../helpers/cardElementOptions';
import {addressError, nameError} from '../../helpers/validation';

import {Components, Services} from 'food-delivery-package';
import * as styles from './order-make-page.module.scss';

import CreditCard from '../../img/credit-card.svg';
import HomeIcon from '../../img/home.svg';

const {fillField} = ActionCreators;
const {Button, Input} = Components;
const {CustomerService} = Services;

const CardForm = ({customerSecret, fillField, fullAddress, totalPrice, addedProducts, name, phone, address, history}) => {

    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const restaurantsID = addedProducts.map((item) => item.restID);
    const dishesId = addedProducts.map((item) => item._id);

    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    }
    const handleSubmit = async (e) => {
        await CustomerService.confirmCard({
            CardElement,
            customerSecret,
            stripe,
            elements,
            phone: phone.value,
            name: name.value,
            address: address.value,
            dishesId,
            restaurantsID: [...new Set(restaurantsID)],
            fullAddress: fullAddress.value.formatted_address,
            location: fullAddress.value.geometry.location,
            totalPrice,
            history
        });
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.item}>
                <h2>Payment method</h2>
                <button
                    className={styles.actionBtn}>Add
                </button>
                <div className={styles.content}>
                    <div className={styles.iconBox}>
                        <img
                            src={CreditCard}
                        />
                    </div>
                    <div className={styles.fullwidth}>
                        <CardElement
                            id="card-element"
                            options={CARD_ELEMENT_OPTIONS}
                            onChange={handleChange}
                            hidePostalCode={true}
                        />
                        <div className="card-errors" role="alert">{error}</div>
                    </div>
                </div>
            </div>
            <div className={styles.item}>
                <h2>Delivery options</h2>
                <button className={styles.actionBtn}>Add</button>
                <div className={styles.content}>
                    <div className={styles.iconBox}>
                        <img src={HomeIcon}/>
                    </div>
                    <div className={styles.fullwidth}>
                        <Input
                            value={name && name.value}
                            editInput
                            type="text"
                            error={name && name.error}
                            placeholder="Enter your name"
                            onChange={(e) =>
                                fillField({
                                    field: 'name',
                                    value: e.target.value,
                                    error: nameError(e.target.value)
                                })
                            }
                        />
                        <Input
                            value={phone && phone.value}
                            editInput
                            type="number"
                            placeholder="Enter your phone"
                            onChange={(e) =>
                                fillField({
                                    field: 'phone',
                                    value: e.target.value
                                })
                            }
                        />
                        <Input
                            value={address && address.value}
                            editInput
                            type="text"
                            placeholder="Enter your address"
                            onChange={(e) => {
                                fillField({
                                    field: 'address',
                                    value: e.target.value,
                                    error: address?.error
                                })
                            }}
                            onBlur={async (e) => {
                                const resp = await addressError(e.target.value);
                                if (resp.error) {
                                    fillField({
                                        field: 'address',
                                        error: resp.error,
                                    });
                                } else {
                                    fillField({
                                        field: 'address',
                                        error: null,
                                        value: address.value
                                    });
                                    fillField({
                                        field: 'fullAddress',
                                        value: resp.address,
                                    })
                                }
                            }}
                            error={address && address.error}
                        />
                    </div>
                </div>
            </div>
            <Button
                disabled={!name || !address || !phone || (name && name.error) || (address && address.error) || (phone && phone.error)}
                onClick={handleSubmit}
            >
                Checkout
            </Button>
        </div>
    );
}

export default connect((state) => {
    const {PAYMENT_REDUCER, RESTAURANT_REDUCER} = state;
    const {name, phone, address, fullAddress} = PAYMENT_REDUCER;
    const {addedProducts, totalPrice} = RESTAURANT_REDUCER;
    return {
        name,
        phone,
        address,
        fullAddress,
        addedProducts,
        totalPrice
    }
}, {
    fillField
})(CardForm);