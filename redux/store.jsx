import { configureStore } from '@reduxjs/toolkit';
import streamReducer from './slices/streamSlice';
import authReducer from './slices/authSlice';
const store = configureStore({
  reducer: {
    stream: streamReducer,
    auth: authReducer,
    
  },
});

export default store;
