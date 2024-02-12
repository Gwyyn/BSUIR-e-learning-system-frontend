import React, {useRef, useState} from 'react';


import cl from './AddAnswerToTask.module.scss';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {PdfIcon} from "../../components/icons/PdfIcon";
import {DocIcon} from "../../components/icons/DocIcon";
import axios from "../../axios";
import {DeleteIcon} from "../../components";


export const AddAnswerToTask = () => {
    const {id, activeTab} = useParams()
    const lessonData = useSelector(state => state.lessons.lessons)
    const userData = useSelector(state => state.auth.data)

    const [selectedFileTask, setSelectedFileTask] = useState('');
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    // const [formDataState, setFormDataState] = useState(null);
    const inputFileRef = useRef(null);

    const getFileIcon = () => {
        if (fileUrl && fileUrl.endsWith('.pdf')) {
            return <PdfIcon/>;
        } else {
            return <DocIcon/>;
        }
    };
    const onClickRemoveFile = () => {
        setFile(null);
        setFileUrl('')
    };
    const handleSelectChange = (event) => {
        setSelectedFileTask(event.target.value);
    };

    const handleAddFile = (event) => {
        const selectedTask = event.target.value;

        if (selectedTask === '') {
            alert("Выберите задание, на которое хотите прикрепить ответ");
            return;
        }

        const uploadedFile = event.target.files[0];

        setFile(uploadedFile);
    };

    const getLessonId = async (subjectId, lessonType) => {
        try {
            const response = await axios.get(`/lesson/${subjectId}/getLessonId?type=${lessonType}`);
            return response.data._id;
        } catch (error) {
            console.error('Ошибка при получении lessonId:', error);
            return null;
        }
    };
    let answerId = '';
    const onSubmit = async () => {
        try {
            const lessonId = await getLessonId(id, activeTab);
            const copyFileName = `/uploads/files/${file.name}`;
            const answerObject = {
                [selectedFileTask]: copyFileName,
            };

            const params = {
                id: userData._id,
                lessonId,
                answer: answerObject

            }
            await axios
                .post('/answers', params)
                .then(response => {
                    answerId = response.data._id;
                })
                .catch(error => {
                    console.error(error);
                });
            const  gradeParams = {
                userId: userData._id,
                lessonId,
                answerId
            }

            await axios
                .post('/grades', gradeParams)
                .then((res)=> {
                    console.log(res)
                })
                .catch(e => {
                    console.error(e);
                });
            alert("Ответ отправлен!")
        } catch (e) {
            console.error(e);
            alert('Ошибка при отправлении ответа');
        }

    }
    const onClickSave = async () => {
        try {
            if (!file) {
                alert('Выберите файл для сохранения');
                return;
            }

            const allowedExtensions = ['doc', 'docx', 'pdf'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                alert('Можно загружать только файлы с расширениями doc, docx и pdf');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            await axios
                .post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    const data = response.data;
                    setFileUrl(data.url);
                    // setFile(null);
                })
                .catch(error => {
                    console.error(error);
                });
            onSubmit()
        } catch (e) {
            console.error(e);
            alert('Ошибка при сохранении файла');
        }
    };


    return (
        <div className={cl.root}>
            <div className={cl.rootWrapper}>
                <div className={cl.goBack}>
                    <Link to={`/subjects/${id}`} style={{textDecoration: 'none'}}>
                        <div className={cl.toMainScreen}>&lt;- К дисциплине</div>
                    </Link>
                </div>
                <div className={cl.contentWrapper}>
                    <div className={cl.selectTaskWrapper}>
                        <div className={cl.dropdownWrapper}>
                            <div className={cl.dropdown}>
                                <select value={selectedFileTask} onChange={handleSelectChange} className={cl.dropdownList}>
                                    <option value="" disabled>Выберите задание к ответу</option>
                                    {lessonData.items
                                        .filter((lesson) => lesson.type === activeTab)
                                        .map((lesson) => (
                                            <>
                                                {lesson.file_path.map((filePath, fileId) => (
                                                    <option key={fileId} value={filePath} className={cl.dropdownListOption}>
                                                        {filePath.split('/').pop()}
                                                    </option>
                                                ))}
                                            </>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <button onClick={() => inputFileRef.current.click()} className={cl.chooseBtn}>
                                Прикрепить свой ответ
                            </button>
                            <input ref={inputFileRef} type="file" onChange={handleAddFile} hidden/>
                        </div>
                    </div>
                    {file && (
                        <div className={cl.fileWrapper}>
                            <div className={cl.programFile}>
                                {getFileIcon()}{' '} {file.name}
                            </div>
                            <DeleteIcon onClick={onClickRemoveFile}>
                                Удалить
                            </DeleteIcon>
                        </div>
                    )}
                    <div>
                        <button className={cl.saveBtn} onClick={onClickSave}>
                            Сохранить ответ
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
};
