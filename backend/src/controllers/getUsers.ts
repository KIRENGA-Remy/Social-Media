import express, { Request, Response } from 'express';
import Users from '../models/Users'

export default async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        res.status(201).json({ message: "User successfully retrieved", user})
    } catch (err) {
        res.status(500).json({ message: "Failed to get users", error: err})
    }
}
