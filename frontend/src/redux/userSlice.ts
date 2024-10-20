// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define Types for the state
// interface User {
//   id: string;
//   friends: string[]; 
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string,
//   occupation: string,
//   picturePath: string,
//   viewedProfile: Number,
//   impressions: Number,
//   location: string
// }

// interface Post {
//   _id: string;
//   userId: string,
//   firstName: string, 
//   lastName: string
//   location: string,
//   description: string,
//   picturePath: string,
//   userPicturePath: string,
//   likes: Map<string, boolean>
//   comments: string[]
// }

// interface AuthState {
//   mode: "light" | "dark";
//   user: User | null;
//   token: string | null;
//   posts: Post[];
// }

// const initialState: AuthState = {
//   mode: "light",
//   user: null,
//   token: null,
//   posts: []
// };

// // Create slice
// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setMode: (state) => {
//       state.mode = state.mode === "light" ? "dark" : "light";
//     },
//     setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
//       console.log(state.user);
      
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     setLogout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//     setFriends: (state, action: PayloadAction<{ friends: string[] }>) => {
//       if (state.user) {
//         state.user.friends = action.payload.friends;
//       } else {
//         console.error("User is not logged in.");
//       }
//     },
//     setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
//       state.posts = action.payload.posts;
//     },
//     setPost: (state, action: PayloadAction<{ post: Post }>) => {
//       const updatedPosts = state.posts.map((post) =>
//         post._id === action.payload.post._id ? action.payload.post : post
//       );
//       state.posts = updatedPosts;
//     }
//   }
// });

// export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
// export default authSlice.reducer;









import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  friends: string[]; 
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  occupation: string,
  picturePath: string,
  viewedProfile: number,
  impressions: number,
  location: string
}

interface UserState {
  user: User | null;  // Only one user
  mode: "light" | "dark";
  token: string | null;
}

const initialState: UserState = {
  user: null,  // Null initially, no user logged in
  mode: "light",
  token: null,
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ 
      id: string,
      friends: string[]; 
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      occupation: string,
      picturePath: string,
      viewedProfile: number,
      impressions: number,
      location: string,
      token: string }>
    ) => {
      // Replace the current user with the logged-in user
      state.user = {
        id: action.payload.id,
        friends: action.payload.friends,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        occupation: action.payload.occupation,
        picturePath: action.payload.picturePath,
        viewedProfile: action.payload.viewedProfile,
        impressions: action.payload.impressions,
        location: action.payload.location,
      };
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  }
});

export const { setMode, setLogin, setLogout } = UserSlice.actions;
export default UserSlice.reducer;
