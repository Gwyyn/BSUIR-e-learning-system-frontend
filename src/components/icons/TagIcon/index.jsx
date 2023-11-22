import React from 'react';

import cl from './TagIcon.module.scss'
import ico from "./TagIcon.svg";


export const TagIcon = () => {
    return (
        <div className={cl.root}>
            <img src={ico} alt="eyeIcon"/>
        </div>
    );
};
