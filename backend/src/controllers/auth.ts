import { Request, Response } from 'express';
import Users from '../models/Users';
import bcrypt from 'bcrypt'

export default async function register(req: Request, res: Response) {
  try {
    const {
        firstName,
        lastName,
        email,
        password,
        occupation,
        friends,
        picturePath,
        viewedProfile,
        impressions,
        location
    } = req.body
    const findEmail = await Users.email;
    if (email === findEmail) {
        res.status(400).json({ message: "User already exist"})
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const newUser = new Users({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        occupation,
        friends,
        picturePath,
        viewedProfile,
        impressions,
        location
    })
    const savedUser = await newUser.save();
    res.json({message:"User created successfully", savedUser})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
}
