import { Request, Response } from 'express';
import Posts from '../models/Posts';
import Users from '../models/Users';

export default async function createPost(req: Request, res: Response): Promise<void>  {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await Users.findById(userId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const newPost = new Posts({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: [],
            comments: []
        });

        await newPost.save();
        const userPosts = await Posts.find({ userId });  

        res.status(200).json({ message: "Post created successfully", posts: userPosts });
        return;
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ message: "Failed to create a post" });
        return;
    }
}
