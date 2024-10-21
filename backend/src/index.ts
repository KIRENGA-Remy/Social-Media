import express, { Request, Response, urlencoded } from 'express';
import connectDB from './config/db'
import dotenv from 'dotenv'
import register from './controllers/register'
import login from './controllers/login'
import auth from './controllers/auth'
import getUserFriends from './controllers/getUserFriends'
import getUsers from './controllers/getUsers'
import addRemoveFriend from './controllers/addRemoveFriend'
import createPost from './controllers/createPost'
import getUserPosts from './controllers/getUserPosts'
import getFeedPosts from './controllers/getFeedPosts'
import likePost from './controllers/likePost'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()
connectDB()
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}))
app.use(cors({
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
        credentials: true
      }));
      
    app.get("/", (req: Request, res: Response) => {
    res.send("I am here")
})
app.post("/auth/register", register)
app.post("/auth/login", login)
app.get("/auth/validate", auth)
app.get("/users/:id", getUsers)
app.get("/users/friends", getUserFriends)
app.patch("/users/:id/friends/:friendId", addRemoveFriend)
app.post('/posts', createPost)
app.get('/posts', getFeedPosts)
app.get('/posts/:userId', getUserPosts)
app.patch('/posts/:id', likePost)

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


















// import express, { Request, Response } from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import multer, { FileFilterCallback } from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import authRoutes from "./routes/auth";
// import userRoutes from "./routes/users";
// import postRoutes from "./routes/posts";
// import { register } from "./controllers/auth";
// import { createPost } from "./controllers/posts";
// import verifyToken from "./middleware/auth"; // Ensure this is default or named export based on your setup
// import User from "./models/User";
// import Post from "./models/Post";
// import { users, posts } from "./data/index";

// /* CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// /* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
//     cb(null, "public/assets");
//   },
//   filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ 
//   storage,
//   fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//     // Implement your file filter logic if needed
//     cb(null, true); // Accept the file
//   }
// });

// /* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

// /* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

// /* MONGOOSE SETUP */
// const PORT = process.env.PORT || 6001;
// mongoose
//   .connect(process.env.MONGO_URL as string, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//     /* ADD DATA ONE TIME */
//     // User.insertMany(users);
//     // Post.insertMany(posts);
//   })
//   .catch((error) => console.log(`${error} did not connect`));
