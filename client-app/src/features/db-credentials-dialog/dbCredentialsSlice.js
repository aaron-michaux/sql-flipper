
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
  error: null,
  connected: false,
};

export async function asyncPost(endpoint, timeout, data) {
  let result = null;
  let id = null;
  await Promise.race([
    axios.post(endpoint, data),
    new Promise((resolve, reject) => {
      id = setTimeout(resolve, timeout, 'Timeout');
    })
  ]).then((value) => {
    result = value;
  })
    .finally(() => { clearTimeout(id); });

  return (result === 'Timeout')
    ? { error: 'Servier Unreachable' }
    : result.data;
}

export const connectDatabaseAsync = createAsyncThunk(
  'DB_CONNECT',
  async (credentials) => {
    return asyncPost('http://localhost:3001/api/connect', 1000, credentials);
  }
);

export const dbCredentialsSlice = createSlice({
  name: 'dbCredentials',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.credentials = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectDatabaseAsync.pending, (state) => {
        state.status = 'loading';
        state.connected = false;
      })
      .addCase(connectDatabaseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error;
        state.connected = (state.error == null);
      });
  },
});

export const { setCredentials } = dbCredentialsSlice.actions;

export const hasDatabaseConnection = (state) => {
  const o = state.dbCredentials;
  return o.error == null && o.connected === true && o.status === 'idle';
};

export default dbCredentialsSlice.reducer;
