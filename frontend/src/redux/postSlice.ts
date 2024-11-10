import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    location: string;
    description: string;
    picturePath: string;
    userPicturePath: string;
    likes: Map<string, boolean>;
    comments: string[];
}

interface PostState {
    posts: Post[];
}

const initialState: PostState = {
    posts: []
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
            state.posts = Array.isArray(action.payload.posts) ? action.payload.posts : [];
        },
        setPost: (state, action: PayloadAction<{ post: Post }>) => {
            const index = state.posts.findIndex((post) => post._id === action.payload.post._id);
            if (index !== -1) {
                state.posts[index] = action.payload.post;  
            }
        }
    }
});
export const { setPosts, setPost } = postSlice.actions;
export default postSlice.reducer;
