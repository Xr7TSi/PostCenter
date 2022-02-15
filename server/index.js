import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

// dotenv is used to secure mongo login info, which is part of CONNECTION_URL
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true})); //Used to parse JSON bodies
app.use(express.urlencoded({ limit: "30mb", extended: true})); //Parse URL-encoded bodies
app.use(cors());

// this adds a prefix of api/posts to all routes in postRouts
app.use('/api/posts', postRoutes);
// this adds a prefix of api/users to all routes in userRouts
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL
// const CONNECTION_URL = "mongodb+srv://Xr7TSi:Tacoma10@cluster0.7ekba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, {useNEWUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
    .catch(err => console.log(err.message));





