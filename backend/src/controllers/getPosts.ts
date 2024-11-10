import { Request, Response } from 'express'
import Posts from '../models/Posts'

export default async function getPosts(req: Request, res: Response) {
    try {
        const posts = await Posts.find();
        res.status(200).json({ message:"Post retrieved", posts})
    } catch (err) {
        res.status(500).json({ message: "Failed to get post", err })
    }
}
