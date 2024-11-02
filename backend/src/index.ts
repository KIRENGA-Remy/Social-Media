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
import uploadRoute from './controllers/routeUpload'
import cloudinary from './utils/cloudinary';
import upload from './middleware/multer';
import fs from 'fs';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import multer, { Multer } from 'multer';
import sharp from 'sharp';

dotenv.config()
const app = express()
connectDB()
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true}))

// app.use(express.urlencoded({ extended: true}))
app.use(cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'], 
        credentials: true
      }));





interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// app.post("/auth/register", upload.single('image'), async (req: MulterRequest, res: Response, next) => {
//   try {
//     // If no file was uploaded, pass the request to the next middleware (register controller)
//     if (!req.file) {
//       res.status(400).json({ success: false, message: 'No file uploaded' });
//       return next();
//     }

//     // If a file is uploaded, upload it to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: 'image'
//     });

//     // Remove the file from the server after uploading to Cloudinary
//     fs.unlinkSync(req.file.path);

//     // Add the Cloudinary result to the request body (you can store the public_id and URL in MongoDB)
//     req.body.picturePath = {
//       data: process.env.CLOUDINARY_URL, // Cloudinary URL
//       name: req.file.originalname
//     };

//     // Pass control to the register controller after uploading
//     next();
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error during upload',
//       error
//     });
//   }
// }, register);

app.post('/auth/register',upload.single('image'), register)
app.get("/", (req: Request, res: Response) => {
    res.send("I am here")
})
// app.post("/auth/register", register)
app.post("/auth/login", login)
app.get("/auth/validate", auth)
app.get("/users/:userId", getUsers)
app.get("/users/:userId/friends", getUserFriends)
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
