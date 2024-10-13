import { Request, Response } from 'express';
import Users from '../models/Users';
import bcrypt from 'bcrypt'

export default async function register(req: Request, res: Response): Promise<void> {
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
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
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
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
        location
    })
    const savedUser = await newUser.save();
    res.status(201).json({message:"User created successfully", savedUser})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
}


