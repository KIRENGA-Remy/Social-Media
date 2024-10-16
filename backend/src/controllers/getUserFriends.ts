import express, { Request, Response } from 'express';
import Users from '../models/Users'

export default async function getUserFriends(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
          }

        const friends = await Promise.all(
            user.friends.map( async (friendId: string) => { 
                const friend = await Users.findById(friendId);
                if(!friend){
                    return null;
                }
                return friend;
            }
        )
    )
    // Filter out null values in case some friends were not found
    const formattedFriends = friends
      .filter(friend => friend !== null)
      .map(({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath
      }));

    res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(500).json({ message: "Failed to get users friends", error: err})
    }
}

