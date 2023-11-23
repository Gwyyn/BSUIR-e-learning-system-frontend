import React from 'react';

import cl from './DeleteIcon.module.scss'
import ico from "./DeleteIcon.svg";


export const DeleteIcon = ({onClick}) => {
    return (
        <div className={cl.root} onClick={onClick}>
            <img src={ico} alt="deleteIcon"/>
        </div>
    );
};
