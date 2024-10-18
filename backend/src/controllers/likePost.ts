import { Request, Response } from "express";
import Posts from "../models/Posts";

export default async function likePost(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Posts.findById(id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to like/dislike the post", err });
  }
}
