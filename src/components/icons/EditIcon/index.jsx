import React from 'react';

import cl from './EditIcon.module.scss'
import ico from "./EditIcon.svg";


export const EditIcon = () => {
    return (
        <div className={cl.root}>
            <img src={ico} alt="editIcon"/>
        </div>
    );
};
