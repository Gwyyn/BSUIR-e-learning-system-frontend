import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {selectIsAuth} from "../../redux/slices/auth";
import axios from "../../axios";

import './AddPost.module.scss';

export const AddPost = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const inputFileRef = React.useRef(null);

    const isEdting = Boolean(id)

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            if (file.type.startsWith('image/')) {
                formData.append('file', file);
                const { data } = await axios.post('/upload', formData);
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
        setImageUrl('')
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
        <div className="paper">
            <button onClick={() => inputFileRef.current.click()} className="button outlined">
                Загрузить превью
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <>
                    <button className="button contained error" onClick={onClickRemoveImage}>
                        Удалить
                    </button>
                    <img className="image" src={`http://localhost:3001${imageUrl}`} alt="Uploaded"/>
                </>
            )}
            <br/>
            <br/>
            <input
                className="textfield title"
                type="text"
                placeholder="Заголовок статьи..."
                value={title}
                onChange={event => setTitle(event.target.value)}
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
                onChange={(e) => onChange(e.target.value)}
            />
            <div className="buttons">
                <button onClick={onSubmit} className="button large contained">
                    {isEdting ? "Сохранить" : "Опубликовать"}
                </button>
                <Link to="/">
                    <button className="button large">Отмена</button>
                </Link>
            </div>
        </div>
    );
};
