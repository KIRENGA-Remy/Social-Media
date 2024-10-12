import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async ():Promise<void> => {
    try {
        const MONGO_URL = process.env.MONGODB_URL
        if(!MONGO_URL){
            throw new Error("Mongodb url not found")
        }
        await mongoose.connect(MONGO_URL)
        console.log("Connected to database");
        
    } catch (err) {
        if (err instanceof Error) {
            console.error("Failed to connect to database", err.message)
        } else {
            console.error("Not connected to database")
        }
    }
}

export default connectDB;