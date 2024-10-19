// import { createSlice } from "@reduxjs/toolkit";

// const initialState= {
//     mode: "light",
//     user: null,
//     token: null,
//     posts: []
// }

// export const authSlice = createSlice({
//     name:"auth",
//     initialState,
//     reducers: {
//         setMode: (state) => {
//             state.mode = state.mode === "light" ? "dark" : "light"
//         },
//         setLogin: (state, action) => {
//             state.user = action.payload.user,
//             state.token = action.payload.token
//         },
//         setLogout: (state) => {
//             state.user = null,
//             state.token = null
//         },
//         setFriends: (state, action) => {
//             if(state.user){
//                 state.user.friends = action.payload.friends;
//             } else {
//                 console.error("User didn't logged in");
                
//             }
//         },
//         setPosts : (state, action) => {
//             state.posts = action.payload.posts
//         },
//         setPost : (state, action) => {
//             const updatedPosts = state.posts.map((post) => {
//                 if(post._id === action.payload.post_id) return action.payload.post;
//                 return post;
//             })
//             state.posts = updatedPosts;
//         }
//     }
// })

// const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
// export default authSlice.reducer;

















import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Types for the state
interface User {
  id: string;
  friends: string[]; 
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  occupation: string,
  picturePath: string,
  viewedProfile: Number,
  impressions: Number,
  location: string
}

interface Post {
  _id: string;
  userId: string,
  firstName: string, 
  lastName: string
  location: string,
  description: string,
  picturePath: string,
  userPicturePath: string,
  likes: Map<string, boolean>
  comments: string[]
}

interface AuthState {
  mode: "light" | "dark";
  user: User | null;
  token: string | null;
  posts: Post[];
}

const initialState: AuthState = {
  mode: "light",
  user: null,
  token: null,
  posts: []
};

// Create slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action: PayloadAction<{ friends: string[] }>) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User is not logged in.");
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<{ post: Post }>) => {
      const updatedPosts = state.posts.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
      state.posts = updatedPosts;
    }
  }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
