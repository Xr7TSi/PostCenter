import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();


// localhost:5000/posts
router.get ('/', getPosts);

router.post ('/', auth, createPost);
// update post by id
// update button will be removed if user not authenticated.  managed on front end

router.patch ('/:id', auth, updatePost);

// delete post by id
// delete button will be removed if user not authenticated. managed on front end

router.delete ('/:id', auth, deletePost);
// like post by id
// logic for limiting user to one like per post in the back end
router.patch ('/:id/likePost', auth, likePost);


export default router;