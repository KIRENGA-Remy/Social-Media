import { Request, Response }  from 'express';
import Posts from '../models/Posts';
import Users from '../models/Users'

export default async function createPost(req: Request, res: Response) {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await Users.findById(userId);
        if(!user){
            res.status(404).json({ message: "User not found"})
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
                likes: {},
                comments: []
            })
            await newPost.save();
            const post = await Posts.find();
            res.status(200).json({message:"Post created successfully" , post})
    } catch (err) {
        res.status(500).json({ message: "Failed to create a post"})
    }
}