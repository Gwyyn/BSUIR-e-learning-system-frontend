import React from 'react';
import cl from "./Registration.module.scss";
import {BsuirIcon} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, fetchRegister, selectIsAuth, selectUserRole} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";


export const Registration = () => {

    const dispatch = useDispatch()
    const useData = useSelector(state => state.auth.data)
    const role = useData?.role

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            role: 'student',
            firstName: '',
            lastName: '',
            middleName: '',
            login: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))


        if (!data.payload) {
            return alert('Не удалось зарегистрироваться!')
        }else {
            return <Navigate to="/"/>
        }
        // if ('token' in data.payload) {
        //     window.localStorage.setItem('token', data.payload.token)
        // }

    }

    if (role === "admin") {
        return (
            <div className={cl.root}>
                <div className={cl.wrapper}>
                    <div className={cl.icoBsuir}>
                        <BsuirIcon/>
                    </div>
                    <div className={cl.title}>Добро пожаловать в личный кабинет БГУИР</div>
                    <form onSubmit={handleSubmit(onSubmit)} className={cl.formWrapper}>
                        <div className={cl.radio}>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        defaultValue="student"
                                        {...register('role', {required: 'Укажите роль'})}

                                    />
                                    Студент
                                </label>
                            </div>
                            <div className={cl.radioTeach}>
                                <label>
                                    <input
                                        type="radio"
                                        defaultValue="educator"
                                        {...register('role', {required: 'Укажите роль'})}

                                    />
                                    Преподаватель
                                </label>
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Фамилия"
                                id="lastNameInput"
                                className={cl.input}
                                {...register('lastName', {required: 'Укажите фамилию'})}

                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Имя"
                                id="firstNameInput"
                                className={cl.input}
                                {...register('firstName', {required: 'Укажите имя'})}

                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Отчество"
                                id="middleNameInput"
                                className={cl.input}
                                {...register('middleName', {required: 'Укажите отчество'})}

                            />
                        </div>
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
                        <button type="submit"
                                className={cl.button}
                        >
                            Зарегистрировать
                        </button>
                    </form>

                </div>
            </div>
        );
    } else {
        return <Navigate to="/"/>
    }

};