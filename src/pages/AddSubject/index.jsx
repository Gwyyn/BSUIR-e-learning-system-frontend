import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {selectIsAuth} from "../../redux/slices/auth";
import axios from "../../axios";


import {PdfIcon} from "../../components/icons/PdfIcon";
import {DocIcon} from "../../components/icons/DocIcon";
import cl from "./AddSubject.module.scss";
import {DeleteIcon} from "../../components";

export const AddSubject = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [hours, setHours] = useState('');
    const [tags, setTags] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const inputFileRef = React.useRef(null);

    const isEdting = Boolean(id)

    const handleChangeFile = async (event) => {
        try {
            const file = event.target.files[0];
            const allowedExtensions = ['doc', 'docx', 'pdf'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
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
        } catch (e) {
            console.warn(e);
            alert('Ошибка при загрузке файла');
        }
    };

    const onClickRemoveFile = () => {
        setFileUrl('')
    };

    const onChange = (value) => {
        setText(value);
    };

    const onSubmit = async () => {
        try {
            const fields = {
                title,
                hours,
                fileUrl,
                tags,
                text
            }
            setLoading(true)

            const {data} = isEdting
                ? await axios.patch(`/subjects/${id}`, fields)
                : await axios.post('/subjects', fields);

            const _id = isEdting ? id : data._id;
            navigate(`/subjects/${_id}`);
        } catch (e) {
            console.warn(e)
            alert('Ошибка при создании учебной дисциплины!')

        }
    }

    const getFileIcon = () => {
        if (fileUrl && fileUrl.endsWith('.pdf')) {
            return <PdfIcon/>;
        } else {
            return <DocIcon/>;
        }
    };

    React.useEffect(() => {
        if (id) {
            axios
                .get(`/subjects/${id}`)
                .then(({data}) => {
                    setTitle(data.title);
                    setText(data.text);
                    setHours(data.hours);
                    setTags(data.tags.join(','));
                    setFileUrl(data.fileUrl)
                })
                .catch(e => {
                    console.warn(e)
                    alert('Ошибка при получении учебной дисциплины!')
                })

        }
    }, [])

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <div className={cl.root}>
            <div className={cl.rootWrapper}>
                <div className={cl.goBack}>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <div className={cl.toMainScreen}>&lt;-  На главный экран</div>
                    </Link>
                </div>
                <div className={cl.textInputWrapper}>
                    <input
                        className={cl.textInput}
                        type="text"
                        placeholder="Название учебной дисциплины..."
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <input
                        className={cl.textInput}
                        type="number"
                        placeholder="Количество часов..."
                        value={hours}
                        onChange={event => setHours(event.target.value)}
                    />
                    <input
                        className={cl.textInput}
                        type="text"
                        placeholder="Тэги"
                        value={tags}
                        onChange={event => setTags(event.target.value)}
                    />
                    <textarea
                        className={cl.textAreaInput}
                        value={text}
                        placeholder="Описание дисциплины"
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
                <div className={cl.textPinWrapper}>
                    <div className={cl.textPin}>
                        Прикрепить программу учебной дисциплины
                    </div>
                    <br/>
                    <button onClick={() => inputFileRef.current.click()} className={cl.chooseBtn}>
                        Выбрать
                    </button>
                    <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                </div>

                {fileUrl && (
                    <div className={cl.fileWrapper}>
                        <div className={cl.programFile}>
                            <br/>
                            <br/>
                            <br/>
                            {getFileIcon()}{' '}
                            {fileUrl.split('/').pop()}
                            &nbsp;
                            &nbsp;
                            <DeleteIcon onClick={onClickRemoveFile}/>
                        </div>
                    </div>
                )}
                <br/>
                <br/>
                <div className={cl.btnWrapper}>
                    <button onClick={onSubmit} className={cl.saveBtn}>
                        {isEdting ? "Сохранить" : "Создать"}
                    </button>
                </div>
            </div>
        </div>

    );
};
