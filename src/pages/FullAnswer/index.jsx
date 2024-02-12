import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {StudentAnswer} from "../../components";

import cl from './FullAnswer.module.scss'
import axios from "../../axios";
import {PdfIcon} from "../../components/icons/PdfIcon";
import {DocIcon} from "../../components/icons/DocIcon";

export const FullAnswer = () => {

    const {answerId, userId, activeTab, subjectId} = useParams();
    console.log("answerId",answerId)
    const [isLoading, setIsLoading] = useState(true)
    const [answersData, setAnswersData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [gradeData, setGradeData] = useState(null)

    const [grade, setGrade] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios
                    .get(`/answers/get-answer/${userId}/${answerId}`)
                    .then(res => {
                        setAnswersData(res.data)
                    })

                await axios.get(`/user/${userId}`)
                    .then(response => {
                        setUserData(response.data)
                    })
                    .catch(err => {
                        console.warn(err)
                        alert('Ошибка при получении данных студента')
                    })
                await axios.get(`/grades/get-grade/${answerId}`)
                    .then(response => {
                        console.log("/grades/get-grade/${answerId}", response.data)
                        setGradeData(response.data)
                    })
                    .catch(err => {
                        console.warn(err)
                        alert('Ошибка при получении отметки')
                    })
            } catch (e) {
                console.warn(e)
                alert('Ошибка при получении ответа')
            }

            setIsLoading(false)
        }
        fetchData();

    }, [])

    const downloadFile = (filePath) => {
        const fileUrl = `http://localhost:3001${filePath}`;
        saveAs(fileUrl, fileUrl.split('/').pop());
    };
    const handleDownloadClick = (filePath) => {
        downloadFile(filePath);
    };

    const getFileIcon = (ans) => {
        const fileExtension = ans.pop().split('.').pop().toLowerCase();
        if (fileExtension === 'pdf') {
            return <PdfIcon/>;
        } else {
            return <DocIcon/>;
        }
    };

    const handleGradeChange = (event) => {
        const value = event.target.value;
        setGrade(value);
    };

    const handleSaveClick = async () => {
        try {
            const params = {
                grade: grade
            }
           await axios
               .patch(`/grades/${gradeData._id}`, params)
               .then(res=>{
                   console.log(res.data)
                   alert("Отметка выставлена!")
               })
               .catch(err => {
                   console.warn(err)
                   alert('Ошибка при выставлении отметки')
               })

        } catch (error) {
            console.error('Ошибка при сохранении отметки:', error);
        }
    };

    if (isLoading) {
        return <StudentAnswer isLoading={isLoading} isFullAnswer/>
    }

    return (
        <div className={cl.root}>
            <div className={cl.rootWrapper}>
                <div className={cl.goBack}>
                    <Link to={`/subjects/${subjectId}/${activeTab}/${userId}`} style={{textDecoration: 'none'}}>
                        <div className={cl.toMainScreen}>&lt;-  К ответам</div>
                    </Link>
                </div>
                <StudentAnswer
                    answerId={answersData._id}
                    task={Object.keys(answersData.answer).pop().split('/').pop()}
                    isFullAnswer
                    gradeData={gradeData}
                >
                    <div className={cl.studentFIO}>
                        <span>{userData.lastName} {userData.firstName} {userData.middleName}</span>
                    </div>
                    <div>
                        <br/>
                        <span>Файл с решением</span>
                        <a href={String(Object.values(answersData.answer))} download onClick={(event) => {
                            event.preventDefault();
                            handleDownloadClick(Object.values(answersData.answer))
                        }}
                        >
                            <br/>
                            <div className={cl.programFile}>
                                {getFileIcon(Object.keys(answersData.answer))}{' '}
                                {Object.values(answersData.answer).pop().split('/').pop()}
                            </div>
                        </a>
                    </div>
                    <br/>
                    <div className={cl.gradeWrapper}>
                        <span className={cl.gradeTitle}>Отметка</span>
                        <input
                            className={cl.gradeInput}
                            type="number"
                            min="0"
                            max="10"
                            value={grade}
                            onChange={handleGradeChange}
                        />
                    </div>
                    <div className={cl.saveBtnWrapper}>
                        <button
                            className={cl.saveBtn}
                            onClick={handleSaveClick}
                        >
                            Оценить
                        </button>
                    </div>

                </StudentAnswer>
            </div>
        </div>
    );
};
