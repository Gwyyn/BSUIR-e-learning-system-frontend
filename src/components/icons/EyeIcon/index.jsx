import React from 'react';

import cl from './EyeIcon.module.scss'
import ico from "./EyeIcon.svg";


export const EyeIcon = () => {
    return (
        <div className={cl.root}>
            <img src={ico} alt="eyeIcon"/>
        </div>
    );
};
