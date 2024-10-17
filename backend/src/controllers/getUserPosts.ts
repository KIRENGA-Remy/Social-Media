import { Request, Response } from "express";
import Posts from "../models/Posts";

export default async function getUserPosts(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const posts = await Posts.find({ userId });
        res.status(200).json({ message: "User posts retrieved", posts})
    } catch (err) {
        res.status(500).json({message: "Failed to get user posts",err})
    }
}
