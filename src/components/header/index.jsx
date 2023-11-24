import React from 'react';
import cl from './header.module.scss'

import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const useData = useSelector(state => state.auth.data)
    const role = useData?.role

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

            <div>
                {isAuth ? (
                    <>
                    {role === "admin" &&
                        <Link to="/add-post">
                            Написать статью
                        </Link>
                    }
                        {role === "admin" &&
                            <>
                                <Link to="/register">
                                    <button>Создать аккаунт</button>
                                </Link>
                            </>
                        }
                        {role === "educator" &&
                            <>
                                <Link to="/add-subject">
                                    <button>Создать учебную дисциплину</button>
                                </Link>
                                <Link to="/subjects">
                                    <button>Мои дисциплины</button>
                                </Link>
                            </>
                        }
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <button onClick={onClickLogout} className={cl.exitBtn}>
                                Выйти
                            </button>
                        </Link>
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
