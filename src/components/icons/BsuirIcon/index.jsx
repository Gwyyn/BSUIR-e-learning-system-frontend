import React from 'react';
import cl from './BsuirIcon.module.scss'
import ico from './BsuirIcon.svg'
export const BsuirIcon = () => {
    return (
        <div className={cl.root}>
            <img src={ico} alt="icoBsuir"/>
        </div>
    );
};
