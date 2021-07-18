
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverUrl, asyncPost } from './../../lib/post';

const initialState = {
  status: 'idle',
  error: null,
  data: null,
};

export const queryTablesAsync = createAsyncThunk(
  'DB_CONNECT',
  async () => {
    let result = await asyncPost(`${serverUrl}/api/tables`, {}, 3000);
    return (result == null) ? { error: 'Server Unreachable' } : result.data;
  }
);

export const tablesListSlice = createSlice({
  name: 'dbCredentials',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryTablesAsync.pending, (state) => {
        state.status = 'loading';
        state.connected = false;
      })
      .addCase(queryTablesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = action.payload?.error;
        state.data = action.payload?.data;
      });
  },
});

export const getTablesState = (state) => { return state.tablesList; };

export default tablesListSlice.reducer;
