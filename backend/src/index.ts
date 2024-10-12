import express, { Request, Response } from 'express';
const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("I am here")
})

const PORT = 4321;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})