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
    location: Number
}

const UsersSchema: Schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    occupation: { type: String, required: true },
    friends: { type: [String], default: [] },
    picturePath: { type: String, required: true },
    viewedProfile: { type: Number, required: true },
    impressions: { type: Number, required: true },
    location: { type: String, required: true },
  });

  export default mongoose.model<IUsers>('Users', UsersSchema);