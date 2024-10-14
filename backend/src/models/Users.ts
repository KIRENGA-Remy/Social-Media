import mongoose, { Schema, Document } from 'mongoose';

export interface IUsers extends Document{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    occupation: string,
    friends: string[],
    picturePath: string,
    viewedProfile: Number,
    impressions: Number,
    location: string
}

const UsersSchema: Schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    occupation: { type: String, required: true },
    friends: { type: [String], default: [] },
    picturePath: { type: String },
    viewedProfile: { type: Number },
    impressions: { type: Number },
    location: { type: String },
  });

  export default mongoose.model<IUsers>('Users', UsersSchema);