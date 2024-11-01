import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import postSlice from './postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postSlice
  }
})
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']