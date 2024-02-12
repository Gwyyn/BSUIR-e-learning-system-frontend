import {useEffect, useState} from 'react';
import axios from "../../../axios";
import {StudentList} from "../StudentList";

import cl from "./Students.module.scss";

export const Students = ({lessonId, subjectId, activeTab}) => {

    const [usersIdData, setUsersIdData] = useState(null)

    useEffect(() => {
        axios
            .get(`/answers/${lessonId}`)
            .then(res => {
                const uniqueUserIds = [...new Set(res.data.map(item => item.user))];
                setUsersIdData(uniqueUserIds)
            })


    }, [lessonId])


    return (
        <>
            <div className={cl.gridContainer}>
                <div className={cl.postContainer}>
                    <StudentList
                        usersIdData={usersIdData}
                        subjectId={subjectId}
                        activeTab={activeTab}
                    />
                </div>
            </div>
        </>
    );


};