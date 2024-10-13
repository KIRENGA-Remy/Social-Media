import { Request, Response } from 'express';
import Users from '../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User doesn't exist" });
      return
    }

    // Compare passwords
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      res.status(400).json({ message: "Incorrect password" });
      return
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,  // Ensure type-casting to avoid TS errors
      { expiresIn: '1h' }  
    );

    // Return token and user data
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
}
