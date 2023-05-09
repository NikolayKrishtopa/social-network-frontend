import { configureStore } from '@reduxjs/toolkit';
import authRedusers from './slices/authSlice';
import usersReducers from './slices/usersSlice';
import postsReducers from './slices/postsSlice';

const store = configureStore({
  reducer: {
    auth: authRedusers,
    posts: postsReducers,
    users: usersReducers
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
