import {configureStore} from '@reduxjs/toolkit'
import {postsReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";
import {subjectsReducer} from "./slices/subjects";
import {lessonsReducer} from "./slices/lessons";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        subjects: subjectsReducer,
        lessons: lessonsReducer
    }
})

export default store