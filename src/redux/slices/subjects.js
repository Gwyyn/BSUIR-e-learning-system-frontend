import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async () => {
    const {data} = await axios.get('/subjects')
    return data
})
export const fetchTags = createAsyncThunk('subjects/fetchTags', async () => {
    const {data} = await axios.get('/subject-tags')
    return data
})
export const fetchRemoveSubject = createAsyncThunk('subjects/fetchRemoveSubject', (id) => {
    axios.delete(`/subjects/${id}`)
})

const initialState = {
    subjects: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    },

};

const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSubjects.pending]: handlePending('subjects'),
        [fetchSubjects.fulfilled]: handleFulfilled('subjects'),
        [fetchSubjects.rejected]: handleRejected('subjects'),
        [fetchTags.pending]: handlePending('tags'),
        [fetchTags.fulfilled]: handleFulfilled('tags'),
        [fetchTags.rejected]: handleRejected('tags'),
        [fetchRemoveSubject.pending]: handlePendingForRemove('subjects'),
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

export const subjectsReducer = subjectsSlice.reducer