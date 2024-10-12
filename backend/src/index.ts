import express, { Request, Response } from 'express';
import connectDB from './config/db'
import dotenv from 'dotenv'
import register from './controllers/auth'

dotenv.config()
const app = express()
connectDB()

app.get("/", (req: Request, res: Response) => {
    res.send("I am here")
})
app.post("/auth", register)

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})