import React from 'react';
import {Routes, Route} from "react-router-dom";

import {Header} from "./components";
import {Home, Login, Registration} from "./pages"

const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
                {/*</>*/}
                {/*<Login/>*/}
                {/*<Registration/>*/}
            </Routes>
        </>
    )
}

export default App