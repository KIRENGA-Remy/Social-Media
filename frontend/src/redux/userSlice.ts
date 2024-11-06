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
  user: User | null;  
  isAuthenticated: boolean;
  mode: "light" | "dark";
  error: string | null;
}

const initialState: UserState = {
  user: null,  
  isAuthenticated: false,
  mode: "light",
  loading:false,
  error: null,
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
      location: string }>
    ) => {
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
      state.isAuthenticated = true;
    },

    setLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setFriends: (state, action: PayloadAction<{ friends: string[]}>) => {
      if(state.user){
        state.user.friends = action.payload.friends
      } else {
        console.error("No user friend existing!")
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      }
  }
});

export const { setMode, setLogin, setLogout, setFriends, setLoading, setError } = UserSlice.actions;
export default UserSlice.reducer;
