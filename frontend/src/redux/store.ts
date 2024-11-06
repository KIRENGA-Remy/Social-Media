import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice"
import postSlice from './postSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postSlice
  }
})
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']