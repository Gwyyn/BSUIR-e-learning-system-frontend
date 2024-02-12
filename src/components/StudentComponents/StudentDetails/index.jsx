import React, {useEffect, useState} from 'react';
import cl from "./StudentDetails.module.scss";
import axios from "../../../axios";
import AvatarIcon from "../../UserInfo/AvatarIcon.svg";


export const StudentDetails = ({userId}) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/user/${userId}`);
                setUserData(response.data)
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        fetchUserData();

    }, [userId]);

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className={cl.rootWrapper}>
            <div className={cl.root}>
                <img className={cl.avatar} src={userData.avatarUrl !== '' && userData.avatarUrl
                    ?`http://localhost:3001${userData.avatarUrl}`
                    : AvatarIcon
                }
                     alt="avatarIcon"/>
                <span className={cl.studentFIO}>{userData.lastName} {userData.firstName} {userData.middleName}</span>
            </div>
        </div>
    );
}
