// the various dispatch actions are stored in src/reducers/posts.js
// they are resolved to strings in src/constants/actionTypes.js


import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST  } from '../constants/actionTypes.js';
// import everything from ../api in one import statement
import * as api from '../api/index.js';

// action creators are functions that return an action.
export const getPosts = () => async (dispatch) => {
    try {
        // pulls data from api (src/sctions/posts.js)
        const { data } = await api.fetchPosts();
        // returns data (reducers/posts.js)
        dispatch({ type: FETCH_ALL_POSTS, payload: data})
    } catch (error) {
        console.log('Get Posts ' + error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE_POST, payload: data})
    } catch (error) {
        console.log('Create Post ' + error);
    }
}


export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE_POST, payload: data});
    } catch (error) {
        console.log('Update Post ' + error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE_POST, payload: id});
    } catch (error) {
        console.log('Delete Post ' + error);
    }

}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE_POST, payload: data});
    } catch (error) {
        console.log('Like Post ' + error);
    }
}