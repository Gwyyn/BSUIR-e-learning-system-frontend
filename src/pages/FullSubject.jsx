import React from "react";
import {useParams} from "react-router-dom";


import axios from "../axios";
import {Subject} from "../components";

export const FullSubject = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const {id} = useParams()

    React.useEffect(() => {
        axios.get(`/subjects/${id}`).then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            console.warn(err)
            alert('Ошибка при получении учебной дисциплины')
        })
    }, [])

    if (isLoading){
        return <Subject isLoading={isLoading} isFullSubject/>
    }


    return (
        <>
            <Subject
                id={data._id}
                title={data.title}
                user={data.user}
                createdAt={data.createdAt}
                tags={data.tags}
                isFullSubject
            >
                <p>{data.text}</p>
            </Subject>
        </>
    );
};
