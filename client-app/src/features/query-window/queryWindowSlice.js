
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverUrl, asyncPost } from './../../lib/post';

const initialState = {
    currentQuery: '',
    data: null,
    error: null,
    status: 'idle',
};

export const executeQueryAsync = createAsyncThunk(
  'EXECUTE_QUERY',
  async (raw_sql) => {
    const result = await asyncPost(`${serverUrl}/api/execute-query`,
      { sql: raw_sql },
      3000);
      return (result == null)
          ? { error: 'Server Unreachable', data: null }
          : result.data;
  }
);

export const queryWindowSlice = createSlice({
  name: 'queryWindow',
  initialState,
  reducers: {
    setSqlQuery(state, action) {
      state.currentQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeQueryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(executeQueryAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.error = action.payload?.error;
          state.data = action.payload?.data;
      });
  },
});

export const { setSqlQuery } = queryWindowSlice.actions;

export default queryWindowSlice.reducer;
