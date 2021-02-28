import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../store/authtorization/actions';
import {Components} from 'food-delivery-package';
import DishBg from '../../img/dishDefaulBg.jpg';
import RestaurantBg from '../../img/defaulRestBg.jpg';

import * as styles from '../RestaurantPage/restaurant-page.module.scss';
import * as createStyles from './createRestaurant.module.scss';

import AddFilter from './addFilterModal';
import PreviewDishes from "./previewDishes";

const {Input, Button} = Components;
const {setCookie} = ActionCreators;

const CreateRestaurant = (props) => {

    const [settings, setSettings] = useState({
        dishes: [],
        filters: []
    });
    const [dish, setDish] = useState({});
    const [showModal, setModal] = useState(false);

    const addFilterItem = (value) => {
        const newFilter = settings.filters;
        newFilter.push(value);
        setSettings({
            ...settings,
            filters: newFilter
        })
    }
    const removeData = (field, item) => {
        const newData = settings[field];
        newData.splice(newData.indexOf(item), 1);
        setSettings(({
            ...settings,
            [field]: newData
        }))
    }
    const setDishesValues = (field, value) => {
        setDish({
            ...dish,
            [field]: value
        })
    }
    return (
        <div className={styles.wrapper}>
            <AddFilter
                showModal={showModal}
                saveData={addFilterItem}
                closeModal={() => setModal(false)}
            />
            <div className={createStyles.header}>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className={createStyles.addPicture}
                    multiple={false}
                    onChange={(e) => {
                        setSettings({
                            ...settings,
                            imagePreview: URL.createObjectURL(e.target.files[0]),
                            image: URL.createObjectURL(e.target.files[0])
                        })
                    }
                    }
                />
                <div className={styles.profileImg}>
                    <img src={settings.imagePreview || RestaurantBg} alt="empty img"/>
                </div>
                <div className={createStyles.editTitle}>
                    <Input
                        value={settings.name}
                        onChange={(e) => setSettings({
                            ...settings,
                            name: e.target.value
                        })}
                        placeholder="Restaurant Title"
                        type="text"
                        editInput
                    />
                </div>
            </div>
            <nav>
                <ul className={styles.categoryList}>
                    <li
                        onClick={() => props.setCookie({gfdgf: 'gddg'})}
                        className={`${styles.categoryItem} ${styles.activeNav}`}
                    >
                        All
                    </li>
                    {settings.filters && settings.filters.map((category, index) => (
                        <li
                            key={index}
                            className={styles.categoryItem}
                        >
                            {category}
                            <span
                                onClick={() => removeData('filters', category)}
                                className={createStyles.deleteBtn}/>
                        </li>
                    ))
                    }
                    <li
                        className={styles.categoryItem}
                        onClick={() => setModal(true)}
                    >
                        Add Filters
                    </li>
                </ul>
            </nav>
            <div className={createStyles.template}>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className={createStyles.addDish}
                    multiple={false}
                    onChange={(e) =>
                        setDishesValues('img', URL.createObjectURL(e.target.files[0]))
                    }
                />
                <div className={styles.wrapperBlock}>
                    <ul className={createStyles.productCapacity}>
                        <Input
                            type="text"
                            placeholder="Enter size of dish"
                            value={dish.size}
                            onChange={(e) => setDishesValues('size', e.target.value)}
                            editInput
                        />
                        <Input
                            type="text"
                            placeholder="Enter price of dish"
                            value={dish.price}
                            onChange={(e) => setDishesValues('price', e.target.value)}
                            editInput
                        />
                    </ul>
                    <div className={styles.productImageBlock}>
                        <img src={dish.img || DishBg} alt="not found"/>
                    </div>
                </div>

                <div className={styles.itemWrapper}>
                    <Input
                        type="text"
                        placeholder="Enter name of dish"
                        value={dish.name}
                        onChange={(e) => setDishesValues('name', e.target.value)}
                        editInput
                    />
                    <Input
                        type="text"
                        placeholder="Enter description of dish"
                        value={dish.description}
                        onChange={(e) => setDishesValues('description', e.target.value)}
                        editInput
                    />
                </div>
                <div className={createStyles.btnBottom}>
                    <Button
                        onClick={() => setDish({
                            name: '',
                            price: '',
                            size: '',
                            description: ''
                        })}
                        primaryButton
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            const newDishes = settings.dishes;
                            newDishes.push(dish);
                            setSettings({
                                ...settings,
                                dishes: newDishes
                            })
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <PreviewDishes
                deleteItem={removeData}
                dishes={settings.dishes}/>
            <div className={createStyles.btnBottom}>
                <Button
                    onClick={() => setSettings({
                        dishes: [],
                        filters: []
                    })}
                    primaryButton
                >
                    Cancel changes
                </Button>
                <Button
                    onClick={() =>
                        alert('Currently this functionality isn\'t available :(')
                    }
                >
                    Add restaurant
                </Button>
            </div>
        </div>
    );
};

export default connect((state) => {
    return {
        imageT: state.RESTAURANT_REDUCER.image
    }
}, {
    setCookie
})(CreateRestaurant);
