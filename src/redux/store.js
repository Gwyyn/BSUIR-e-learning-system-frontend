import {configureStore} from '@reduxjs/toolkit'
import {postsReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";
import {subjectsReducer} from "./slices/subjects";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        subjects: subjectsReducer,
    }
})

export default store