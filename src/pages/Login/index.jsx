import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {BsuirIcon} from "../../components";
import cl from './Login.module.scss'
import {useForm} from 'react-hook-form'
import {Navigate} from "react-router-dom";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            login: '',
            password: ''
        },
        mode: 'onChange'
    })

    const [isActiveTable, setActiveTable] = useState(false);

    const handleForgotPassword = () => {
        setActiveTable(true)
    };

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))

        if (!data.payload){
           return alert('Не удалось авторизоваться!')
        }
        if('token' in data.payload){
            window.localStorage.setItem('token', data.payload.token)
        }
    }
    if (isAuth) {
        return <Navigate to="/"/>
    }
    return (
        <div className={cl.root}>

            <div className={cl.wrapper}>
                <div className={cl.icoBsuir}>
                    <BsuirIcon/>
                </div>
                <div className={cl.title}>Добро пожаловать в личный кабинет БГУИР</div>
                <form onSubmit={handleSubmit(onSubmit)} className={cl.formWrapper}>
                    <div>
                        <input
                            type="text"
                            placeholder="Логин"
                            id="loginInput"
                            className={cl.input}
                            {...register('login', {required: 'Укажите логин'})}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Пароль"
                            id="passwordInput"
                            className={cl.input}
                            {...register('password', {required: 'Укажите пароль'})}
                        />
                    </div>
                    <button type="submit" className={cl.button}>Войти</button>
                    <div className={cl.forgotPassword}>
                        Забыли пароль?
                        <span className={cl.link} onClick={handleForgotPassword}>&nbsp; Нажмите сюда</span>
                    </div>
                    {isActiveTable &&
                        <div className={cl.tableHelp}>
                            Администратор | +375 29 204 25 29
                        </div>
                    }
                </form>

            </div>
        </div>
    );
};