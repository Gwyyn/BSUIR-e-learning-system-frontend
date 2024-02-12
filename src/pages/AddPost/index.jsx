import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {selectIsAuth} from "../../redux/slices/auth";
import axios from "../../axios";

import cl from './AddPost.module.scss';

export const AddPost = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const inputFileRef = React.useRef(null);

    const isEdting = Boolean(id)

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            if (file.type.startsWith('image/')) {
                formData.append('file', file);
                const {data} = await axios.post('/upload', formData);
                setImageUrl(data.url);
            } else {
                return alert('Можно загружать только изображения');
            }
        } catch (e) {
            console.warn(e)
            alert('Ошибка при загрузке файла')
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl(null)
    };

    const onChange = (value) => {
        setText(value);
    };

    const onSubmit = async () => {
        try {
            const fields = {
                title,
                imageUrl,
                tags,
                text
            }
            setLoading(true)

            const {data} = isEdting
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields);

            const _id = isEdting ? id : data._id;
            navigate(`/posts/${_id}`);
        } catch (e) {
            console.warn()
            alert('Ошибка при создании статьи!')

        }
    }

    React.useEffect(() => {
        if (id) {
            axios
                .get(`/posts/${id}`)
                .then(({data}) => {
                    setTitle(data.title);
                    setText(data.text);
                    setTags(data.tags.join(','));
                    setImageUrl(data.imageUrl)
                })
                .catch(e => {
                    console.warn(e)
                    alert('Ошибка при получении статьи!')
                })

        }
    }, [])

    // const options = {
    //     spellChecker: false,
    //     maxHeight: '400px',
    //     autofocus: true,
    //     placeholder: 'Введите текст...',
    //     status: false,
    //     autosave: {
    //         enabled: true,
    //         delay: 1000,
    //     },
    // };

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <div className={cl.root}>
            <div className={cl.rootWrapper}>
                <div className={cl.goBack}>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <div style={{color:"#000000"}}>&lt;-  На главный экран</div>
                    </Link>
                </div>
                <div className={cl.previewWrapper}>
                    {imageUrl == null &&
                        <>
                            <button onClick={() => inputFileRef.current.click()} className={cl.choosePreviewBtn}>
                                Загрузить превью
                            </button>
                            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                        </>
                    }
                    {imageUrl && (
                        <div className={cl.preview}>
                            <img className={cl.photo} src={`http://localhost:3001${imageUrl}`} alt="Uploaded"/>
                            <button className={cl.deleteBtn} onClick={onClickRemoveImage}>
                                Удалить превью
                            </button>
                        </div>
                    )}
                </div>
                <br/>
                <br/>
                <div className={cl.textInputWrapper}>
                    <input
                        className={cl.textInput}
                        type="text"
                        placeholder="Заголовок статьи"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <input
                        className={cl.textInput}
                        type="text"
                        placeholder="Тэги"
                        value={tags}
                        onChange={event => setTags(event.target.value)}
                    />
                    <textarea
                        placeholder="Описание статьи"
                        className={cl.textAreaInput}
                        value={text}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>

                <div className={cl.btnWrapper}>
                    <button onClick={onSubmit} className={cl.saveBtn}>
                        {isEdting ? "Сохранить" : "Опубликовать"}
                    </button>
                </div>
            </div>
        </div>
    );
};
