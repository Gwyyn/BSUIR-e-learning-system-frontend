import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {saveAs} from 'file-saver';


import axios from "../../axios";
import {CreateTypeOfLesson, FileTasksList, LessonTypeList, Students, Subject} from "../../components";
import {PdfIcon} from "../../components/icons/PdfIcon";
import {DocIcon} from "../../components/icons/DocIcon";
import {fetchLessons} from "../../redux/slices/lessons";

import cl from './FullSubject.module.scss'


export const FullSubject = () => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data)
    const lessonData = useSelector(state => state.lessons.lessons)
    const role = userData?.role
    const [dataSubject, setDataSubject] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingStudents, setLoadingStudents] = useState(true);


    const inputFileRef = useRef(null);
    const [activeTab, setActiveTab] = useState('');

    const [fileUrl, setFileUrl] = useState('');

    const [selectedLessonType, setSelectedLessonType] = useState('');
    const [lessonTypes, setLessonTypes] = useState([]);


    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/lessons/getAllBySubjectId/${id}`);
                const existingLessonTypes = response.data.map(lesson => lesson.type);
                setLessonTypes(existingLessonTypes);
            } catch (error) {
                console.error('Ошибка при получении данных занятий:', error);
            }

        }
        fetchData();

        dispatch(fetchLessons(id))

        axios.get(`/subjects/${id}`).then(res => {
            setDataSubject(res.data)
            setLoading(false)
            setLoadingStudents(false)
        }).catch(err => {
            console.warn(err)
            alert('Ошибка при получении учебной дисциплины')
        })
    }, [])
    useEffect(() => {
        const fetchAddTask = async () => {
            if (fileUrl !== '') {
                setLoadingStudents(true)
                await onAddTask();
            }
        }
        fetchAddTask()
    }, [fileUrl])

    const fetchLesson = async () => {
        await dispatch(fetchLessons(id))
        setLoadingStudents(false)
    }

//For files------------------------------
    const getFileIcon = () => {
        const fileExtension = dataSubject.fileUrl.split('.').pop().toLowerCase();

        if (fileExtension === 'pdf') {
            return <PdfIcon/>;
        } else {
            return <DocIcon/>;
        }
    };
    const downloadFile = (filePath) => {
        const fileUrl = `http://localhost:3001${filePath}`;
        saveAs(fileUrl, filePath.split('/').pop());
    };
    const handleDownloadClick = (filePath) => {
        downloadFile(filePath);
    };
    const handleAddFile = async (event) => {
        if (activeTab === '') {
            alert("Выберите тип занятия для добавления задания")
            return inputFileRef.current.value = '';

        }
        try {
            const file = event.target.files[0];
            const allowedExtensions = ['doc', 'docx', 'pdf'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                const isFileAlreadyAdded = checkIfFileAlreadyAdded(file.name);
                if (isFileAlreadyAdded) {
                    return alert('Файл с таким именем уже добавлен.');
                }

                const formData = new FormData();
                formData.append('file', file);

                await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(response => {
                        const data = response.data;
                        setFileUrl(data.url);

                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                return alert('Можно загружать только файлы с расширениями doc, docx и pdf');

            }
            inputFileRef.current.value = '';
        } catch (e) {
            console.warn(e);
            alert('Ошибка при загрузке файла');
        }
    };
    const checkIfFileAlreadyAdded = (fileName) => {
        const lesson = lessonData.items.find((lesson) => lesson.type === activeTab);
        const file_path = `/uploads/files/${fileName}`
        if (lesson) {
            return lesson.file_path.includes(file_path);
        }

        return false;
    };
    const handleDeleteFile = async (subjectId, filePath) => {
        try {
            setLoadingStudents(true)
            // Отправить запрос на сервер для удаления файла из массива file_path
            await axios.delete(`/lesson/${subjectId}/delete-file`, {
                data: {filePath},
            });
            await fetchLesson();
        } catch (error) {
            console.error('Ошибка при удалении файла', error);
            alert('Ошибка при удалении файла')

        }
    };

    //For type lesson------------------------------

    const handleSelectChange = (event) => {
        setSelectedLessonType(event.target.value);
    };
    const handleCreateType = async () => {
        if (selectedLessonType && !lessonTypes.includes(selectedLessonType)) {
            setLessonTypes([...lessonTypes, selectedLessonType]);
            setLoadingStudents(true)
            const subjectId = id
            const type = selectedLessonType
            const params = {
                subjectId,
                type
            }
            await axios.post('/lessons', params)
                .then(res => {
                }).catch(err => {
                    console.warn(err)
                    alert('Ошибка при получении данных занятия')
                })
            setSelectedLessonType('');
            dispatch(fetchLessons(id))

        } else {
            alert('Такой тип занятия уже существует');
        }

    };
    const handleTabChange = (type) => {
        setActiveTab(type);
    }
    const handleDeleteType = async (subjectId, type) => {
        try {
            setLoadingStudents(true)
            await axios.delete(`/lesson/${subjectId}/delete-type?type=${type}`)
                .then(res => {
                    // Обновить состояние после успешного удаления
                    setLessonTypes(prevLessonTypes => prevLessonTypes.filter(prevType => prevType !== type));
                })
                .catch(err => {
                    console.warn(err);
                    alert('Ошибка при удалении типа занятия');
                });
            fetchLesson()
        } catch (error) {
            console.error('Ошибка при удалении типа занятия', error);
        }
    };

    const onAddTask = async () => {
        try {
            const idLesson = lessonData.items.filter((lesson) => lesson.type === activeTab)
            const id = idLesson[0]._id;
            console.log(id)
            const file_path = fileUrl
            const params = {
                file_path
            }
            await axios.patch(`/lesson/${id}`, params)
            fetchLesson()
            setFileUrl('')
        } catch (e) {
            console.warn(e)
            alert('Ошибка при добавлении задания')

        }
    }


    if (isLoading) {
        return <Subject isLoading={isLoading} isFullSubject/>
    }

    return (
        <div className={cl.root}>
            <div className={cl.rootWrapper}>
                <div className={cl.goBack}>
                    <Link to="/subjects" style={{textDecoration: 'none'}}>
                        <div className={cl.toMainScreen}>&lt;- К дисциплинам</div>
                    </Link>
                </div>
                <div className={cl.subjectWrapper}>
                    <Subject
                        id={dataSubject._id}
                        title={dataSubject.title}
                        user={dataSubject.user}
                        createdAt={dataSubject.createdAt}
                        tags={dataSubject.tags}
                        isFullSubject
                    >
                        <div className={cl.timesWrapper}>
                            <span className={cl.times}>
                                Количество часов:
                            </span>
                            &nbsp;
                            {dataSubject.hours}ч.
                        </div>
                        <br/>
                        <div className={cl.subjectDescrWrapper}>
                            <div className={cl.subjectDescr}>
                                Описание дисциплины
                            </div>
                            {dataSubject.text}
                        </div>

                        <div>
                            <br/>
                            {dataSubject.fileUrl &&
                                <>
                                    <div className={cl.programSubject}>
                                        Программа учебной дисциплины
                                    </div>
                                    <a href={dataSubject.fileUrl} download onClick={(event) => {
                                        event.preventDefault();
                                        handleDownloadClick(dataSubject.fileUrl)
                                    }}>
                                        <div className={cl.programFile}>
                                            {getFileIcon()}{' '}
                                            {dataSubject.fileUrl.split('/').pop()}
                                        </div>
                                    </a>
                                </>

                            }
                        </div>
                        {userData?._id === dataSubject.user._id &&
                            <div>
                                <CreateTypeOfLesson
                                    selectedLessonType={selectedLessonType}
                                    handleSelectChange={handleSelectChange}
                                    handleCreateType={handleCreateType}
                                />
                            </div>
                        }
                        <div className={cl.typeLesson}>
                            <LessonTypeList
                                id={id}
                                lessonTypes={lessonTypes}
                                activeTab={activeTab}
                                handleTabChange={handleTabChange}
                                userData={userData}
                                dataSubject={dataSubject}
                                handleDeleteType={handleDeleteType}
                            />
                        </div>
                        {userData?._id === dataSubject.user._id && activeTab &&
                            <div>
                                <br/>
                                <br/>
                                <button onClick={() => inputFileRef.current.click()} className={cl.chooseBtn}>
                                    Прикрепить задание к дисциплине
                                </button>
                                <input ref={inputFileRef} type="file" onChange={handleAddFile} hidden/>
                            </div>
                        }

                        {activeTab && (
                            <>
                                <br/>
                                <div>
                                    Список заданий
                                </div>
                                <FileTasksList
                                    lessonData={lessonData}
                                    activeTab={activeTab}
                                    handleDownloadClick={handleDownloadClick}
                                    getFileIcon={getFileIcon}
                                    userData={userData}
                                    dataSubject={dataSubject}
                                    handleDeleteFile={handleDeleteFile}
                                />
                                <br/>
                            </>

                        )}

                        {(role === 'student' && activeTab !== '') && (
                            <div className={cl.btnsWrapper}>
                                <div>
                                    <Link to={`/subjects/${id}/${activeTab}/add-answer`}>
                                        <button className={cl.chooseBtn}>
                                            Прикрепить ответ на задание
                                        </button>

                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/answers/my-answers/${userData._id}/${activeTab}`}>
                                        <button className={cl.chooseBtn}>
                                            Мои ответы
                                        </button>
                                    </Link>
                                </div>

                            </div>
                        )}

                        {userData?._id === dataSubject.user._id && activeTab &&
                            <>
                                <br/>
                                <div>
                                    Список студентов, кто выполнил и загрузил задание
                                </div>
                                {!isLoadingStudents &&
                                    <Students
                                        lessonId={(lessonData.items.filter((lesson) => lesson.type === activeTab))[0]._id}
                                        subjectId={id}
                                        activeTab={activeTab}
                                    />
                                }

                            </>
                        }


                    </Subject>
                </div>
            </div>
        </div>
    );
};
