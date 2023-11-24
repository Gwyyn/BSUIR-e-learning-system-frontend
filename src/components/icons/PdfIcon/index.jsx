import React from 'react';

import cl from './PdfIcon.module.scss'
import ico from "./pdf.svg";


export const PdfIcon = () => {
    return (
        <div className={cl.root}>
            <img src={ico} alt="pdfIcon"/>
        </div>
    );
};
