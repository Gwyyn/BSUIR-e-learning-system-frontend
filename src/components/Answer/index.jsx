import React from 'react';


import styles from './Answer.module.scss';

export const Answer = (
    {
        task,
        answer,
        isLoading, //Добавит скелетон
    }
) => {

    if (isLoading) {//Добавит скелетон
        return <></>;
    }
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <>
                    <span>Задание: </span>
                    <span>{task} </span>
                    <span>Мой ответ: </span>
                    <span>{answer} </span>
                </>
            </div>
        </div>
    );
};
