import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    // String value is user id stored with each like.  see controllers/posts.js
    likes: {
        type: [String],
        default: []
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;