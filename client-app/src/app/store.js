
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Reducers
import dbCredentialsReducer from '../features/db-credentials-dialog/dbCredentialsSlice';
import mainWindowReducer from '../features/main-window/mainWindowSlice';

// The Store
export const store = configureStore({
  reducer: {
    mainWindow: mainWindowReducer,
    dbCredentials: dbCredentialsReducer,
  },
});
