import React, {useState} from 'react';
import cl from "../registration/registration.module.scss";
import {IcoBsuir} from "../../components";

export const Registration = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [role, setRole] = useState('студент');

    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const handleInputChange = (event, setState) => {
        setState(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsButtonPressed(false)
        console.log("Отработало")
        // Здесь можно добавить логику для обработки отправки формы
    };


    return (
        <div className={cl.root}>
            <div className={cl.wrapper}>
                <div className={cl.icoBsuir}>
                    <IcoBsuir/>
                </div>
                <div className={cl.title}>Добро пожаловать в личный кабинет БГУИР</div>
                <form onSubmit={handleSubmit} className={cl.formWrapper}>
                    <div className={cl.radio}>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="студент"
                                    checked={role === 'студент'}
                                    onChange={(event) => handleInputChange(event, setRole)}
                                />
                                Студент
                            </label>
                        </div>
                        <div className={cl.radioTeach}>
                            <label>
                                <input
                                    type="radio"
                                    value="преподаватель"
                                    checked={role === 'преподаватель'}
                                    onChange={(event) => handleInputChange(event, setRole)}
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
                            value={lastName}
                            onChange={(event) => handleInputChange(event, setLastName)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Имя"
                            id="firstNameInput"
                            className={cl.input}
                            value={firstName}
                            onChange={(event) => handleInputChange(event, setFirstName)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Отчество"
                            id="middleNameInput"
                            className={cl.input}
                            value={middleName}
                            onChange={(event) => handleInputChange(event, setMiddleName)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Логин"
                            id="loginInput"
                            className={cl.input}
                            value={login}
                            onChange={(event) => handleInputChange(event, setLogin)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Пароль"
                            id="passwordInput"
                            className={cl.input}
                            value={password}
                            onChange={(event) => handleInputChange(event, setPassword)}
                        />
                    </div>
                    <button type="submit"
                            className={`${cl.button} ${isButtonPressed ? cl.button.active : ''}`}
                            onClick={() => setIsButtonPressed(true)}
                    >
                        Зарегистрировать
                    </button>
                </form>

            </div>
        </div>
    );
};