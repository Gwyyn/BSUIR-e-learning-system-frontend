import React from 'react';
import cl from './icoBsuir.module.scss'
import ico from './icoBsuir.svg'
export const IcoBsuir = () => {
    return (
        <div className={cl.root}>
            <img src={ico} alt="icoBsuir"/>
        </div>
    );
};
