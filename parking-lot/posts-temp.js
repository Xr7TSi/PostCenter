// this file was replaced with client/src/reducers/posts.js in order to correct error at compile which did not impact performance.



// defines how to handle the array of posts based on each action

import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST  } from '../constants/actionTypes.js';

export default (posts = [], action) => {
  
  switch (action.type) {
    
    case FETCH_ALL_POSTS:
      return action.payload;

    case CREATE_POST:
      return [...posts, action.payload];

    case UPDATE_POST:
      return posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });

    case DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);

    case LIKE_POST:
      return posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });

    default:
      return posts;
  }
};