import express, { Request, Response, urlencoded } from 'express';
import connectDB from './config/db'
import dotenv from 'dotenv'
import register from './controllers/register'
import login from './controllers/login'
import auth from './controllers/auth'
import getUserFriends from './controllers/getUserFriends'
import getUser from './controllers/getUser'
import addRemoveFriend from './controllers/addRemoveFriend'
import createPost from './controllers/createPost'
import getUserPosts from './controllers/getUserPosts'
import getUsers from './controllers/getUsers'
import getPosts from './controllers/getPosts'
import likePost from './controllers/likePost'
import uploadRoute from './controllers/routeUpload'
import cloudinary from './utils/cloudinary';
import upload from './middleware/multer';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import multer, { Multer } from 'multer';

dotenv.config()
const app = express()
connectDB()
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true}))

app.use(cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'], 
        credentials: true
      }));

app.get("/", (req: Request, res: Response) => {
    res.send("I am here")
})
app.post("/auth/register", register)
app.post("/auth/login", login)
app.get("/auth/validate", auth)
app.get("/users/:userId", getUser)
app.get("/users", getUsers)
app.get("/users/:userId/friends", getUserFriends)
app.patch("/users/:userId/friends/:friendId", addRemoveFriend)
app.post('/posts', createPost)
app.get('/posts', getPosts)
app.get('/posts/:userId', getUserPosts)
app.patch('/posts/:postId', likePost)

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
