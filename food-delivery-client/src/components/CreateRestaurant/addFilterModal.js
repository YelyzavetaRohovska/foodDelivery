import React, {useEffect, useState} from 'react';
import {Components} from 'food-delivery-package';

import * as createStyles from './createRestaurant.module.scss';

const {Input, Button} = Components;

const AddFilter = ({saveData, closeModal, showModal}) => {
    const [filter, setFilter] = useState('');
    useEffect(() => {
        setFilter('');
    }, [showModal]);
    return (
        <div className={`${createStyles.modalOverlay} ${showModal && createStyles.visible}`}>
            <div className={createStyles.modalBody}>
                <Input
                    type="text"
                    editInput
                    placeholder="Enter name of filters"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <div className={createStyles.btnBottom}>
                    <Button
                        primaryButton
                        onClick={() => closeModal()}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={filter.trim().length < 3}
                        onClick={() => {
                            saveData(filter);
                            closeModal()
                        }}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddFilter;
