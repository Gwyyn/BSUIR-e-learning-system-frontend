import React from 'react';
import cl from './header.module.scss'

import {Link} from "react-router-dom";

export const Header = () => {

    return (
        <div className={cl.root}>
            <span className={cl.title}>«БГУИР: Университет»</span>

            <Link className={cl.wrapperEntryBtn} to="/login">
                <div className={cl.entryBtn}>
                    Войти
                </div>
            </Link>

        </div>
    );
};
