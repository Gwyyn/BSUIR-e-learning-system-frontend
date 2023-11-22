import React from 'react';

import cl from './DeleteIcon.module.scss'
import ico from "./DeleteIcon.svg";


export const DeleteIcon = () => {
    return (
        <div className={cl.root}>
            <img src={ico} alt="deleteIcon"/>
        </div>
    );
};
