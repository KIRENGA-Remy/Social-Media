import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Users from '../models/Users';

export default async function auth(req: Request, res: Response): Promise<void> {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    const secretKey = process.env.JWT_SECRET as string;
    const verifyToken = jwt.verify(token, secretKey) as JwtPayload;

    const user = await Users.findById(verifyToken._id).select('_id email')
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (err: any) {
    if(err.name === 'TokenExpiredError'){
      res.status(401).json({ message: 'Token expired'});
    } else {
      console.error('Server error during authentication:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  }
}
