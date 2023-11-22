import React from 'react';
import {Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Header} from "./components";
import {FullPost, Home, Login, Registration} from "./pages"
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";

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
                {/*<Route path="/add-post" element={<FullPost/>}/>*/}
            </Routes>
        </>
    )
}

export default App