import React from 'react';
import cl from './header.module.scss'

import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const userData = useSelector(state => state.auth.data)
    const role = userData?.role

    const location = useLocation();
    const currentPath = location.pathname;

    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')

        }
    };

    return (
        <div className={cl.root}>
            <Link to="/" className={cl.title}>
                <span>«БГУИР: Университет»</span>
            </Link>

            <div className={cl.navBarWrapper}>
                {isAuth ? (
                    <div className={cl.navBar}>
                        {role === "admin" &&
                            <>
                                <Link to="/add-post" style={{textDecoration: 'none'}}>
                                    <div className={cl.navBtn}
                                         style={{color: currentPath === '/add-post' ? '#487DB4' : 'black'}}>
                                        Написать статью
                                    </div>
                                </Link>
                                &nbsp;
                                &nbsp;
                                <Link to="/register" style={{textDecoration: 'none'}}>
                                    <div className={cl.navBtn}
                                         style={{color: currentPath === '/register' ? '#487DB4' : 'black'}}>
                                        Создать аккаунт
                                    </div>
                                </Link>
                            </>
                        }
                        {role === "educator" &&
                            <>
                                <Link to="/add-subject" style={{textDecoration: 'none'}}>
                                    <div className={cl.navBtn}
                                         style={{color: currentPath === '/add-subject' ? '#487DB4' : 'black'}}>
                                        Создать учебную дисциплину
                                    </div>
                                </Link>
                                &nbsp;
                                &nbsp;
                                <Link to="/subjects" style={{textDecoration: 'none'}}>
                                    <div className={cl.navBtn}
                                         style={{color: currentPath === '/subjects' ? '#487DB4' : 'black'}}>
                                        Мои дисциплины
                                    </div>
                                </Link>
                            </>
                        }
                        {role === "student" &&
                            <>
                                <Link to="/subjects" style={{textDecoration: 'none'}}>
                                    <div className={cl.navBtn}
                                         style={{color: currentPath === '/subjects' ? '#487DB4' : 'black'}}>
                                        Мои дисциплины
                                    </div>
                                </Link>
                                &nbsp;
                                &nbsp;
                                <Link to="/grades" className={cl.navBtn} style={{textDecoration: 'none'}}>
                                    <div style={{color: currentPath === '/grades' ? '#487DB4' : 'black'}}>
                                        Моя успеваемость
                                    </div>
                                </Link>
                            </>

                        }
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <button onClick={onClickLogout} className={cl.exitBtn}>
                                Выйти
                            </button>
                        </Link>
                    </div>
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
