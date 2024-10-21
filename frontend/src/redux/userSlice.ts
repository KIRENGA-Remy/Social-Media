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
  loading:boolean,
  user: User | null;  // Only one user
  mode: "light" | "dark";
  token: string | null;
}

const initialState: UserState = {
  user: null,  // Null initially, no user logged in
  mode: "light",
  loading:false,
  token: null,
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLoading(state,action:PayloadAction<boolean>){
    state.loading=action.payload
    },
    setLogin: (state, action: PayloadAction<{ 
      _id: string,
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
        id: action.payload._id,
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
