import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// adds function to all requests that includes auth token
API.interceptors.request.use((req) => {
    // if there is a profile in local storage, add req.headers.Authorization which equals token stored in local storage  
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});


export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);

// grabs url plus id parameter to update post
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

// grabs url plus id parameter to delete post
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData)

export const signUp = (formData) => API.post('/user/signup', formData)

