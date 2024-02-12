import React from 'react';
import clsx from 'clsx';


import styles from './Subject.module.scss';
import {EditIcon} from "../icons/EditIcon";
import {DeleteIcon} from "../icons/DeleteIcon";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchRemoveSubject} from "../../redux/slices/subjects";

export const Subject = (
    {
        id,
        title,
        createdAt,
        user,
        tags,
        children,
        isFullSubject,
        isLoading, //Добавит скелетон
        isEditable,
    }
) => {
    const dispatch = useDispatch()

    if (isLoading) {//Добавит скелетон
        return <></>;
    }
    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить учебную дисциплину?')) {
            dispatch(fetchRemoveSubject(id))
        }
    };

    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullSubject})}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/subjects/${id}/edit`}>
                        <EditIcon/>
                    </Link>
                    <DeleteIcon onClick={onClickRemove}/>
                </div>
            )}
            <div className={styles.wrapper}>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: isFullSubject})}>
                        {isFullSubject ? title : <Link to={`/subjects/${id}`}>{title}</Link>}
                    </h2>
                    <ul className={styles.tags}>
                        {tags.map((name) => (
                            <li key={name}>
                                <Link to={`/tag/${name}`}>#{name}</Link>
                            </li>
                        ))}
                    </ul>
                    {user &&
                        <>
                            <span className={clsx(styles.educator, {[styles.educatorFull]: isFullSubject})}>Преподаватель: </span>
                            <span>{user.lastName} </span>
                            <span>{user.firstName} </span>
                            <span>{user.middleName} </span>
                        </>
                    }

                    {children && <div className={styles.content}>{children}</div>}
                </div>
            </div>
        </div>
    );
};
