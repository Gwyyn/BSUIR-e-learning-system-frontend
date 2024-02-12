import React, {useEffect, useState} from 'react';


import cl from './MyAnswers.module.scss';
import {Link, useParams} from "react-router-dom";
import axios from "../../axios";
import {PdfIcon} from "../../components/icons/PdfIcon";
import {DocIcon} from "../../components/icons/DocIcon";
import {useSelector} from "react-redux";
import {DeleteIcon} from "../../components";


export const MyAnswers = () => {

    const {userId, activeTab} = useParams();

    const lessonData = useSelector(state => state.lessons.lessons)


    const [answersData, setAnswersData] = useState(null)
    const [isAnsLoading, setIsAnsLoading] = useState(true);

    useEffect(() => {
        const lessonType = lessonData.items.filter((lesson) => lesson.type === activeTab)
        const lessonId = lessonType[0]._id


        axios
            .get(`/answers/${userId}/${lessonId}`)
            .then(res => {
                setAnswersData(res.data)
                setIsAnsLoading(false)
            })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении ответов')
            })
    }, [])

    const getFileIcon = (ans) => {
        const fileExtension = ans.pop().split('.').pop().toLowerCase();
        if (fileExtension === 'pdf') {
            return <PdfIcon/>;
        } else {
            return <DocIcon/>;
        }
    };

    const onClickRemove = async (id) => {
        if (window.confirm('Вы действительно хотите удалить учебную дисциплину?')) {
            await axios.delete(`/answers/${id}`)
                .then(() => {
                    setAnswersData((prevData) => prevData.filter(ans => ans._id !== id));
                })
                .catch(err => {
                    console.warn(err)
                    alert('Ошибка при удалении ответа')
                })
        }
    };

    if (isAnsLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div className={cl.gridContainer}>
            <div className={cl.postContainer}>
                <div className={cl.goBack}>
                    <Link to="/subjects" style={{textDecoration: 'none'}}>
                        <div className={cl.toMainScreen}>&lt;- К дисциплинам</div>
                    </Link>
                </div>
                {Array.isArray(answersData) ? (
                    answersData.map((ans, id) =>
                        <div key={id} className={cl.root}>
                            <div className={cl.editButtons}>
                                <DeleteIcon onClick={() => onClickRemove(ans._id)}/>
                            </div>
                            <div className={cl.titleWrapper}>
                                <div className={cl.task}>
                                    <div>Задание:</div>
                                    <div className={cl.programFile}>
                                        {getFileIcon(Object.keys(ans.answer))}{' '}
                                        {Object.keys(ans.answer).pop().split('/').pop()}
                                    </div>
                                </div>
                                <div className={cl.answer}>
                                    <div>Мое решение: </div>
                                    <div className={cl.programFile}>
                                        {getFileIcon(Object.values(ans.answer))}{' '}
                                        {Object.values(ans.answer).pop().split('/').pop()}
                                    </div>
                                </div>
                            </div>


                        </div>
                    )
                ) : (
                    <p>No answers available.</p>
                )}
            </div>
        </div>

    )
};
