import { Request, Response } from 'express'
import Posts from '../models/Posts'

export default async function getFeedPosts(req: Request, res: Response) {
    try {
        const post = await Posts.find();
        res.status(200).json({ message:"Post retrieved", post})
    } catch (err) {
        res.status(500).json({ message: "Failed to get post", err })
    }
}
