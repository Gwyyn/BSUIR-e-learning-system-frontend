import React, {useEffect, useState} from 'react';


import cl from './StudentAnswers.module.scss';
import {Link, useParams} from "react-router-dom";
import axios from "../../axios";
import {useSelector} from "react-redux";
import clsx from "clsx";
import {DeleteIcon, EditIcon, StudentAnswer, Subject, TagsBlock} from "../../components";


export const StudentAnswers = () => {

    const {subjectId, activeTab, userId} = useParams();

    const lessonData = useSelector(state => state.lessons.lessons)


    const [answersData, setAnswersData] = useState(null);
    const [gradesData, setGradesData] = useState(null);


    const [isAnsLoading, setIsAnsLoading] = useState(true);

    useEffect(() => {

        const lessonType = lessonData.items.filter((lesson) => lesson.type === activeTab)
        const lessonId = lessonType[0]._id

        const fetchData = async () => {
            try {
                await axios
                    .get(`/answers/${userId}/${lessonId}`)
                    .then(res => {
                        setAnswersData(res.data)
                        setIsAnsLoading(false)
                    })
                    .catch(err => {
                        console.warn(err)
                        alert('Ошибка при получении ответов')
                    })
                await axios
                    .get(`/grades/${userId}`)
                    .then(res => {
                        setGradesData(res.data)
                    })
                    .catch(err => {
                        console.warn(err)
                        alert('Ошибка при получении ответов')
                    })
            } catch (e) {
                console.warn(e)
                alert('Ошибка при получении ответа')
            }
        }
        fetchData()

    }, [])


    if (isAnsLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>

            <div className={cl.gridContainer}>
                <div className={cl.goBack}>
                    <Link to={`/subjects/${subjectId}`} style={{textDecoration: 'none'}}>
                        <div className={cl.toMainScreen}>&lt;-  К дисциплинам</div>
                    </Link>
                </div>
                <div className={cl.postContainer}>
                    {Array.isArray(answersData) ? (
                        answersData.map((ans, id) =>
                            <StudentAnswer
                                answerId={ans._id}
                                subjectId={subjectId}
                                activeTab={activeTab}
                                userId={userId}
                                task={Object.keys(ans.answer).pop().split('/').pop()}
                            />
                        )
                    ) : (
                        <p>No answers available.</p>
                    )}
                </div>
            </div>
        </div>
    )
};


