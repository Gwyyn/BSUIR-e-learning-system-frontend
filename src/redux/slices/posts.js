import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data
})
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', (id) => {
    axios.delete(`/posts/${id}`)
})

const initialState = {
    posts: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    },

};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: handlePending('posts'),
        [fetchPosts.fulfilled]: handleFulfilled('posts'),
        [fetchPosts.rejected]: handleRejected('posts'),
        [fetchTags.pending]: handlePending('tags'),
        [fetchTags.fulfilled]: handleFulfilled('tags'),
        [fetchTags.rejected]: handleRejected('tags'),
        [fetchRemovePost.pending]: handlePendingForRemove('posts'),
    }
})

function handlePendingForRemove(sliceName) {
    return (state, action) => {
        state[sliceName].items = state.posts.items.filter(obj=>obj._id !== action.meta.arg);
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

export const postsReducer = postsSlice.reducer