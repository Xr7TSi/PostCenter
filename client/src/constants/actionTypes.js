

// these variables are actions used in src/actions/posts.js.  
// they could be stored as strings in posts.js but...
// by storing them as variables, they can generate errors if there are typos.  
// strings won't generate such errors.   


export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const LIKE_POST = 'LIKE_POST';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';