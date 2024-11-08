import { Request, Response } from 'express';
import Users from '../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User doesn't exist" });
      return;
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } 
    );

    res.cookie('token', token, {
      httpOnly: true, 
      secure: true, 
      path:"/",
      maxAge: 3600000,
      sameSite: 'none', 
    });
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server Error', err });
  }
}
