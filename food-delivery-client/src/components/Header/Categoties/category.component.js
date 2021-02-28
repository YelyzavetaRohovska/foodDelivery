import React from 'react';
import {headerCategory} from '../../../consts/lists';

import * as styles from '../header.module.scss';

import {Link} from 'react-router-dom';

const Category = (props) => {
    const [activeItem, setActiveItem] = React.useState(0);
    return (
        <ul className={styles.categoriesList}>
            {
                headerCategory && headerCategory.map((item, index) => (
                    <li
                        className={`${styles.categoryItem} ${index === activeItem && styles.active}`}
                        onClick={() => setActiveItem(index)}
                        key={index}
                    >
                        <Link to={item.link}>
                            {item.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}

export default Category;