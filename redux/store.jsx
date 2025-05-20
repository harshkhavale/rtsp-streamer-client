import { configureStore } from '@reduxjs/toolkit';
import streamReducer from './slices/streamSlice';

const store = configureStore({
  reducer: {
    stream: streamReducer,
  },
});

export default store;
