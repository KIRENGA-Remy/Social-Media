import { Request, Response } from 'express';
import Users from '../models/Users'

export default async function addRemoveFriend(req: Request, res: Response): Promise<void> {
    try {
        const { id, friendId } = req.params; 
        const user = await Users.findById(id);
        if(!user){
            res.status(404).json({ message: "User not found!"})
            return;
        }
        const friend = await Users.findById(friendId);
        if (!friend) {
            res.status(404).json({ message: "Friend not found!" });
            return;
          }

                if( user.friends.includes(friendId)){
                    user.friends = user.friends.filter((frendId) => frendId !== friendId)
                    friend.friends = friend.friends.filter((frendId) => frendId !== id)
                } else {
                    user.friends.push(friendId)
                    friend?.friends.push(id)
                }
        await user.save();
        await friend?.save();

        const friends = await Promise.all(
            user.friends.map((id) => Users.findById(id))
          );

          const formattedFriends = friends.filter(friend => friend !== null).map((
            { _id, firstName, lastName, occupation, location, picturePath }) => ({
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath
          }));
    
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(500).json({ message: "Failed to get users", error: err})
    }
}
