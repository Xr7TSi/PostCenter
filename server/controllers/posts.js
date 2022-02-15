import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};

export const updatePost = async (req, res) => {
  // get id from parameter
  const { id: _id } = req.params;
  
  // get updated post from request body, pulled from front end
  const post = req.body;
  // send error if no id
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

  // use PostMessage model to update post
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
  await PostMessage.findByIdAndRemove(id)
  res.json({message: 'Post deleted'}) 
}

export const likePost = async (req, res) => {
  const { id } = req.params;
  
  if(!req.userId) return res.json({ message: 'You must be logged in to like a post' })
  

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

  const post= await PostMessage.findById(id)

  const index = post.likes.findIndex((id) => id === String(req.userId));
  // why -1? Would null work?
  if(index === -1) {
    // adds userID to likes array.  this will increase like count
    post.likes.push(req.userId);
  } else {
    // returns array of all likes except logged in user, effectively deleting the user's like
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost= await PostMessage.findByIdAndUpdate(id, post, {new: true})

  res.json(updatedPost)
}
