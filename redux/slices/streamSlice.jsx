import { createSlice } from '@reduxjs/toolkit';

const streamSlice = createSlice({
  name: 'stream',
  initialState: {
    streams: [],
  },
  reducers: {
    addStream: (state, action) => {
      state.streams.push({
        url: action.payload,
        isPlaying: true,
      });
    },
    togglePlayPause: (state, action) => {
      const stream = state.streams.find(s => s.url === action.payload);
      if (stream) stream.isPlaying = !stream.isPlaying;
    },
    removeStream: (state, action) => {
      state.streams = state.streams.filter(s => s.url !== action.payload);
    },
  },
});

export const { addStream, togglePlayPause, removeStream } = streamSlice.actions;
export default streamSlice.reducer;
