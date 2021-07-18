
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeWindow: 'DbCredentialsDialog'
};

export const mainWindowSlice = createSlice({
  name: 'mainWindow',
  initialState,
  reducers: {
    setActiveWindow(state, value) {
      state.activeWindow = value.payload;
    }
  },
});

// Selectors
export const appIsLoading = (state) => {
  return state.mainWindow.activeWindow === 'DbCredentialsDialog'
    && state.dbCredentials.status === 'loading';
};
export const getActiveWindow = (state) => {
  return state.mainWindow.activeWindow;
};

export const { setActiveWindow } = mainWindowSlice.actions;
export default mainWindowSlice.reducer;
