import React from 'react';
import cl from "./Subjects.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Subject, TagsBlock} from "../index";
import {fetchSubjects, fetchTags} from "../../redux/slices/subjects";


export const Subjects = () => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data)
    const {subjects, tags} = useSelector(state => state.subjects)

    const isSubjectsLoading = subjects.status === 'loading';
    const isTagsLoading = tags.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchSubjects())
        dispatch(fetchTags())
    }, [])


    return (
        <>
            <div className={cl.gridContainer}>
                <div className={cl.postContainer}>
                    {(subjects.items).map((obj, index) =>
                        isSubjectsLoading ? (
                            <Subject key={index} isLoading={true}/>
                        ) : (
                            <Subject
                                id={obj._id}
                                title={obj.title}
                                user={obj.user}
                                createdAt={obj.createdAt}
                                tags={obj.tags}
                                text={obj.text}
                                hours={obj.hours}
                                fileUrl={obj.fileUrl}
                                isEditable={userData?._id === obj.user._id}
                            />
                        )
                    )}
                </div>
                <div className={cl.sidebar}>
                    <TagsBlock items={tags.items} isLoading={isTagsLoading}/>
                </div>
            </div>
        </>
    );


};