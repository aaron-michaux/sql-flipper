
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  credentials: {
    host: '127.0.0.1',
    port: 5432,
    user: 'junibee',
    password: 'jhPMkLvpST7eQaM5gYUdZlHNqQd3O1',
    database: 'dvdrental',
  },
  status: 'idle',
  error: null
};

export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const connectDatabaseAsync = createAsyncThunk(
  'DB_CONNECT',
  async (credentials) => {
    const response = await axios.post('http://localhost:3001/api/connect', credentials);
    return response.data;
  }
);

export const dbCredentialsSlice = createSlice({
  name: 'dbCredentials',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectDatabaseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectDatabaseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error;
      });
  },
});

export default dbCredentialsSlice.reducer;
