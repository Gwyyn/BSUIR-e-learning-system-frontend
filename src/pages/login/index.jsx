import React, {useState} from 'react';
import {Header, IcoBsuir} from "../../components";
import cl from './login.module.scss'

export const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [isActiveTable, setActiveTable] = useState(false);

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Здесь можно добавить логику для обработки отправки формы
        console.log('Логин:', login);
        console.log('Пароль:', password);
    };
    const handleForgotPassword = () => {
        setActiveTable(true)
    };

    return (
        <div className={cl.root}>

            <div className={cl.wrapper}>
                <div className={cl.icoBsuir}>
                    <IcoBsuir/>
                </div>
                <div className={cl.title}>Добро пожаловать в личный кабинет БГУИР</div>
                <form onSubmit={handleSubmit} className={cl.formWrapper}>
                    <div>
                        <input
                            type="text"
                            placeholder="Логин"
                            id="loginInput"
                            className={cl.input}
                            value={login}
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Пароль"
                            id="passwordInput"
                            className={cl.input}
                            value={password}
                            onChange={handlePasswordChange}
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