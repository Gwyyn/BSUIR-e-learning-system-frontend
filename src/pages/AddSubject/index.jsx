import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {selectIsAuth} from "../../redux/slices/auth";
import axios from "../../axios";


import './AddSubject.module.scss';
import {PdfIcon} from "../../components/icons/PdfIcon";
import {DocIcon} from "../../components/icons/DocIcon";

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
            const formData = new FormData();
            const file = event.target.files[0];
            const allowedExtensions = ['doc', 'docx', 'pdf'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                // formData.append('file', file);
                // const { data } = await axios.post('/upload', formData);
                const response = await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Установка правильного заголовка Content-Type
                    },
                });
                const data = response.data;
                setFileUrl(data.url);
                console.log(data)
            } else {
                return alert('Можно загружать только файлы с расширениями doc, docx и pdf');

            }
        } catch (e) {
            console.warn(e);
            alert('Ошибка при загрузке файла');
        }
    };

    const onClickRemoveImage = () => {
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
            console.warn()
            alert('Ошибка при создании учебной дисциплины!')

        }
    }

    const getFileIcon = () => {
        if (fileUrl && fileUrl.endsWith('.pdf')) {
            return <PdfIcon />;
        } else {
            return <DocIcon />;
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
        <div className="paper">
            <input
                className="textfield title"
                type="text"
                placeholder="Название учебной дисциплины..."
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <input
                className="textfield title"
                type="number"
                placeholder="Количество часов..."
                value={hours}
                onChange={event => setHours(event.target.value)}
            />
            <input
                className="textfield tags"
                type="text"
                placeholder="Тэги"
                value={tags}
                onChange={event => setTags(event.target.value)}
            />
            <textarea
                className="simplemde editor"
                value={text}
                placeholder="Описание дисциплины"
                onChange={(e) => onChange(e.target.value)}
            />
            <br/>
            <br/>
            <button onClick={() => inputFileRef.current.click()} className="button outlined">
                Прикрепить программу учебной дисциплины
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {fileUrl && (
                <>
                    <button className="button contained error" onClick={onClickRemoveImage}>
                        Удалить
                    </button>
                    <div>
                        {getFileIcon()}
                        <p>{fileUrl}</p>
                    </div>
                </>
            )}

            <div className="buttons">
                <button onClick={onSubmit} className="button large contained">
                    {isEdting ? "Сохранить" : "Создать"}
                </button>
                <Link to="/">
                    <button className="button large">Отмена</button>
                </Link>
            </div>
        </div>
    );
};
