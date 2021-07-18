
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverUrl, asyncPost } from './../../lib/post';

const initialState = {
  credentials: {
    host: '127.0.0.1',
    port: 5432,
    user: '',
    password: '',
    database: 'l',
  },
  status: 'idle',
  error: null,
  connected: false,
};

export const connectDatabaseAsync = createAsyncThunk(
  'DB_CONNECT',
  async (credentials) => {
    let result = await asyncPost(`${serverUrl}/api/connect`, credentials, 3000);
    return (result == null) ? { error: 'Server Unreachable' } : result.data;
  }
);

export const disconnectDatabaseAsync = createAsyncThunk(
  'DB_DISCONNECT',
  async () => {
    let result = await asyncPost(`${serverUrl}/api/disconnect`, {}, 3000);
    return (result == null) ? { error: 'Server Unreachable' } : result.data;
  }
);

export const dbCredentialsSlice = createSlice({
  name: 'dbCredentials',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.credentials = action.payload;
    },
    setDbConnectionError(state, action) {
      state.error = action.payload;
      state.connected = (state.error == null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectDatabaseAsync.pending, (state) => {
        state.status = 'loading';
        state.connected = false;
      })
      .addCase(connectDatabaseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = action.payload?.error;
        state.connected = (state.error == null);
      })
      .addCase(disconnectDatabaseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(disconnectDatabaseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = action.payload?.error;
        state.connected = false;
      });
  },
});

export const { setCredentials, setDbConnectionError } = dbCredentialsSlice.actions;

export const hasDatabaseConnection = (state) => {
  const o = state.dbCredentials;
  return o.error == null && o.connected === true && o.status === 'idle';
};

export default dbCredentialsSlice.reducer;
