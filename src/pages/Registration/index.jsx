import React from 'react';
import cl from "./Registration.module.scss";
import {BsuirIcon} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";


export const Registration = () => {

    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

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


    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [middleName, setMiddleName] = useState('');
    //
    // const [login, setLogin] = useState('');
    // const [password, setPassword] = useState('');
    //
    // const [role, setRole] = useState('студент');

    // const [isButtonPressed, setIsButtonPressed] = useState(false);

    // const handleInputChange = (event, setState) => {
    //     setState(event.target.value);
    // };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setIsButtonPressed(false)
    //     console.log("Отработало")
    //     // Здесь можно добавить логику для обработки отправки формы
    // };

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))

        if (!data.payload) {
            return alert('Не удалось зарегистрироваться!')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }
    //
    // if (isAuth) {
    //     return <Navigate to="/"/>
    // }


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
};