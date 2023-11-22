import React from 'react';
import cl from './header.module.scss'

import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const onClickLogout = () => {
        if(window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    };

    return (
        <div className={cl.root}>
            <span className={cl.title}>«БГУИР: Университет»</span>

            <div>
                {isAuth ? (
                    <>
                        <Link to="/posts/create">
                            Написать статью
                        </Link>
                        <button onClick={onClickLogout} className={cl.exitBtn}>
                            Выйти
                        </button>
                    </>
                ) : (
                    <>
                        <Link className={cl.entryBtn} to="/login">
                            Войти
                        </Link>
                        {/*<a href="/register">*/}
                        {/*    <Button variant="contained">Создать аккаунт</Button>*/}
                        {/*</a>*/}

                        {/*Добавить эту кнопку, если это будет админ(сделать разделение роли)*/}
                    </>
                )}
            </div>


        </div>
    );
};
