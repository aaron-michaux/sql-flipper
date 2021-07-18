
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverUrl, asyncPost } from './../../lib/post';

const initialState = {
  currentQuery: '',
  queryResponse: null,
  status: 'idle',
  error: null
};

export const executeQueryAsync = createAsyncThunk(
  'EXECUTE_QUERY',
  async (raw_sql) => {
    const result = await asyncPost(`${serverUrl}/api/query`,
      { sql: raw_sql },
      3000);
    return (result == null) ? { error: 'Server Unreachable' } : result.data;
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
        state.error = action.payload.error;
      });
  },
});

export const { setSqlQuery } = queryWindowSlice.actions;

export default queryWindowSlice.reducer;
