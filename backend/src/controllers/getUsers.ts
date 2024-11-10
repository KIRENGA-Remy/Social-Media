import express, { Request, Response } from 'express';
import Users from '../models/Users'

export default async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await Users.find()
        res.status(201).json({ message: "Users successfully retrieved", users})
    } catch (err) {
        res.status(500).json({ message: "Failed to get users", error: err})
    }
}
