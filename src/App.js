import React from 'react';
import {Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Header} from "./components";
import {
    AddAnswerToTask,
    FullPost,
    FullSubject,
    Home,
    Login,
    MyAnswers, MyGrades,
    Registration,
    StudentAnswers,
    Subjects
} from "./pages"
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";
import {AddPost} from "./pages/AddPost";
import {AddSubject} from "./pages/AddSubject";
import {FullAnswer} from "./pages/FullAnswer";

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)


    React.useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/posts/:id" element={<FullPost/>}/>
                <Route path="/posts/:id/edit" element={<AddPost/>}/>
                <Route path="/add-post" element={<AddPost/>}/>

                <Route path="/subjects" element={<Subjects/>}/>
                <Route path="/subjects/:id" element={<FullSubject/>}/>
                <Route path="/subjects/:id/edit" element={<AddSubject/>}/>
                <Route path="/add-subject" element={<AddSubject/>}/>
                <Route path="/subjects/:subjectId/:activeTab/:userId" element={<StudentAnswers/>}/>

                <Route path="/subjects/:id/:activeTab/add-answer" element={<AddAnswerToTask/>}/>

                <Route path="/answers/my-answers/:userId/:activeTab" element={<MyAnswers/>}/>
                <Route path="/answers/:subjectId/:userId/:activeTab/:answerId" element={<FullAnswer/>}/>

                <Route path="/grades" element={<MyGrades/>}/>
            </Routes>
        </>
    )
}

export default App