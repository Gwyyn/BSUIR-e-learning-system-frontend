import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchLessons = createAsyncThunk('subjects/fetchLessons', async (subjectId) => {
    const {data} = await axios.get(`/lessons/getAllBySubjectId/${subjectId}`)
    return data
})

export const fetchRemoveLesson = createAsyncThunk('subjects/fetchRemoveLesson', (id) => {
    axios.delete(`/lessons/${id}`)
})

const initialState = {
    lessons: {
        items: [],
        status: "loading"
    },
};

const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLessons.pending]: handlePending('lessons'),
        [fetchLessons.fulfilled]: handleFulfilled('lessons'),
        [fetchLessons.rejected]: handleRejected('lessons'),
        [fetchRemoveLesson.pending]: handlePendingForRemove('lessons'),
    }
})

function handlePendingForRemove(sliceName) {
    return (state, action) => {
        state[sliceName].items = state.subjects.items.filter(obj=>obj._id !== action.meta.arg);
    };
}
function handlePending(sliceName) {
    return (state) => {
        state[sliceName].items = [];
        state[sliceName].status = 'loading';
    };
}
function handleFulfilled(sliceName) {
    return (state, action) => {
        state[sliceName].items = action.payload;
        state[sliceName].status = 'loaded';
    };
}
function handleRejected(sliceName) {
    return (state) => {
        state[sliceName].items = [];
        state[sliceName].status = 'error';
    };
}

export const lessonsReducer = lessonsSlice.reducer