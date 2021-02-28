import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import Logo from '../../img/logo.png';
import Hamper from '../../img/hamper.png';

import * as styles from './header.module.scss';

import Category from './Categoties/category.component';
import DropDown from './DropDown/drop-down.component';
import Menu from './BurgerMenu/menu.component';

const Header = ({addedProducts, isAuthorized}) => {
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        const handler = (e) => {
            if (e.target.dataset.type !== 'menu') {
                setMenu(false)
            }
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, [isAuthorized]);

    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <img
                    alt="food delivery"
                    src={Logo}/>
            </div>
            <Menu toggleMenu={() => setMenu(!menu)}/>
            <nav className={`${styles.navigation} ${menu && styles.visible}`}>
                <Category/>
            </nav>
            <div>
                <DropDown/>
                <Link to="/shopping-bag">
                    <div className={styles.cart}>
                        {addedProducts.length > 0 && <div className={styles.hamperCount}/>}
                        <img src={Hamper}/>
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default connect((state) => {
    const {AUTH_REDUCER, RESTAURANT_REDUCER} = state;
    const {name, email, phone, countryCode, isAuthorized} = AUTH_REDUCER;
    const {addedProducts} = RESTAURANT_REDUCER
    return {
        name,
        email,
        phone,
        countryCode,
        isAuthorized,
        addedProducts
    }
})(Header);
