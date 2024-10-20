import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  friends: string[]; 
  firstName: string,
  lastName: string,
  email: string,
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
      occupation: string,
      picturePath: string,
      viewedProfile: number,
      impressions: number,
      location: string,
      token: string }>
    ) => {
      // Replace the current user with the logged-in user
      state.user = {
        _id: action.payload._id,
        friends: action.payload.friends,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
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
    setFriends: (state, action: PayloadAction<{ friends: string[]}>) => {
      if(state.user){
        state.user.friends = action.payload.friends
      } else {
        console.error("No user friend existing!")
      }
    }
  }
});

export const { setMode, setLogin, setLogout, setFriends, setLoading } = UserSlice.actions;
export default UserSlice.reducer;
