import mongoose, { Schema, Document } from 'mongoose';

export interface IPosts extends Document{
      userId: string,
      firstName: string, 
      lastName: string
      location: string,
      description: string,
      picturePath: string,
      userPicturePath: string,
      likes: string[],
      comments: string[]
}

const PostsSchema : Schema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String},
    description: { type: String},
    picturePath: { type: String},
    userPicturePath: { type: String},
    likes: {
      type: [String],  
      default: []
  },     
    comments: { type: [String], default: [] }
})

export default mongoose.model<IPosts>('Posts', PostsSchema);
