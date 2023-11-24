import React from 'react';

import cl from './DocIcon.module.scss'
import ico from "./doc.svg";


export const DocIcon = () => {
    return (
        <div className={cl.root}>
            <img src={ico} alt="pdfIcon"/>
        </div>
    );
};
