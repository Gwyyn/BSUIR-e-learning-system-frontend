import React from 'react';
import {Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Header} from "./components";
import {FullPost, FullSubject, Home, Login, Registration, Subjects} from "./pages"
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";
import {AddPost} from "./pages/AddPost";
import {AddSubject} from "./pages/AddSubject";

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

            </Routes>
        </>
    )
}

export default App