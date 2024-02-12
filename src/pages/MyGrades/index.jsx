import {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "../../axios";

import cl from './MyGrades.module.scss';
import {useSelector} from "react-redux";
import {GradesTable} from "../../components/GradesTable";



export const MyGrades = () => {

    const userData = useSelector(state => state.auth.data);

    const [gradesData, setGradesData] = useState(null);
    const [selectedAnswerWithGrades, setSelectedAnswerWithGrades] = useState(null);



    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await axios.get(`/grades/${userData._id}`);
                const gradesData = response.data;
                console.log(gradesData)
                const processedData = await processData(gradesData);

                // Установка состояния
                setGradesData(processedData);
                const answersWithGrades = response.data.filter(item => item.hasOwnProperty('grade'));
                setSelectedAnswerWithGrades(answersWithGrades);

            } catch (e) {
                console.warn(e)
                alert('Ошибка при получении ответа')
            }

        }
        fetchData();

    },[])

    const getLessonData = async (id)=>{
       const res = await axios.get(`/lessons/findByLessonId/${id}`)
        return res.data
    }

    const getSubjectTitle = async (id)=>{
        const res = await axios.get(`/subjects/${id}`)
        return res.data.title
    }

//try catch оформить

    const processData =  async (gradesData) => {
        const subjectData = {};

        for (const grade of gradesData) {
            const lessonId = grade.lesson;
            const lessonData = await getLessonData(lessonId);

            if (!lessonData || !lessonData.length) {
                console.error(`lessonData is undefined or empty for lessonId: ${lessonId}`);
                continue;
            }
            const firstLessonData = lessonData[0];
            const lessonType = firstLessonData.type;
            const subjectId = firstLessonData.subject;

            if (subjectId) {
                const subjectTitle = await getSubjectTitle(subjectId);
                if (!subjectData[subjectId]) {
                    subjectData[subjectId] = {
                        title: subjectTitle,
                        LR: [],
                        LK: [],
                        PZ: [],
                    };
                }
                    subjectData[subjectId][lessonType].push(grade.grade);

            } else {
                console.error(`subjectId is undefined for lessonId: ${lessonId}`);
            }
        }

        return subjectData;
    };


    if (!gradesData) {
        return <p>Loading...</p>;
    }

    return (
        <div className={cl.root}>
            <div className={cl.rootWrapper}>
                <GradesTable
                    gradesData={gradesData}
                />
            </div>

        </div>
    )
};


