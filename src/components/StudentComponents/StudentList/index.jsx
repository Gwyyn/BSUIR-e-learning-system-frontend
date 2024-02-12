import {useEffect, useState} from 'react';
import cl from "./StudentList.module.scss";
import {StudentDetails} from "../StudentDetails";
import {Link} from "react-router-dom";


export const StudentList = ({usersIdData,subjectId, activeTab}) => {


    return (
        <div className={cl.studentListWrapper}>
            {usersIdData &&
                usersIdData.map((userId) => (
                    <Link to={`/subjects/${subjectId}/${activeTab}/${userId}`} style={{textDecoration: "none"}}>
                        <StudentDetails
                            key={userId} userId={userId}
                        />
                    </Link>

            ))}
        </div>
    );


};