import { Request, Response } from "express";
import Posts from "../models/Posts";

export default async function likePost(req: Request, res: Response): Promise<void> {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!postId || !userId) {
      res.status(400).json({ message: "Post ID and User ID are required." });
      return;
    }

    const post = await Posts.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(id => id !== userId);  
    } else {
      post.likes.push(userId); 
    }

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to like/dislike the post", error: err });
  }
}
