import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post{
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
    posts: Post[]
}

const initialState : PostState = {
    posts: []
}

export const PostSlice = createSlice ({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<{posts: Post[]}>) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action: PayloadAction<{ post: Post}>) => {
            const updatedPost = state.posts.map((post) => 
                post._id === action.payload.post._id ? action.payload.post : post
            )
            state.posts = updatedPost;
        }
    }
})

export const { setPosts, setPost } = PostSlice.actions;
export default PostSlice.reducer;
