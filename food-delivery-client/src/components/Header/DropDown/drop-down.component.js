import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from "../../../store/user/actions";
import {Link} from 'react-router-dom';

import * as styles from '../header.module.scss';

const {logoutUser} = ActionCreators;
const DropDown = (props) => {

    const [openDropDown, toggleDropdown] = useState(false)

    return (
        <div
            className={styles.subProfile}
        >
            <p className={styles.userName}>{props.name || 'User Name'}</p>
            <svg
                onClick={() => openDropDown ? toggleDropdown(false) : toggleDropdown(true)}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="12px"
                height="12px"
                viewBox="0 0 255 255"
            >
                <polygon points="0,63.75 127.5,191.25 255,63.75" fill="#fff"/>
            </svg>
            <ul className={`${styles.headerDropdown} ${openDropDown && styles.showDropdown}`}>
                <li>
                    <Link
                        onClick={() => toggleDropdown(false)}
                        to="/user-settings"
                    >
                        Settings
                    </Link>
                </li>
                <li>
                    <Link
                        onClick={() => toggleDropdown(false)}
                        to="/add-restaurant"
                    >
                        Add Restraurant
                    </Link>
                </li>
                <li
                    onClick={() => props.logoutUser()}
                >
                    Log Out
                </li>
            </ul>
        </div>
    );
}

export default connect((state) => {
    const {USER_REDUCER} = state;
    const {phone, name} = USER_REDUCER;
    return {
        phone,
        name,
    }
}, {
    logoutUser
})(DropDown);