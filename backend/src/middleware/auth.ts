import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface CustomRequest extends Request{
    user? : string | object 
}

export default function verifyToken(req: CustomRequest, res: Response, next:NextFunction){
    let token = req.header("Authorization");
    if(!token){
        res.status(403).json({ message: "Access Denied"})
        return;
    }
    if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length).trimLeft();
        return;
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = verified;
}