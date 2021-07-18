
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import dbCredentialsReducer from '../features/db-credentials-dialog/dbCredentialsSlice';
import mainWindowReducer from '../features/main-window/mainWindowSlice';
import tablesListReducer from '../features/tables-list/tablesListSlice';

// The Store
export const store = configureStore({
  reducer: {
    mainWindow: mainWindowReducer,
    dbCredentials: dbCredentialsReducer,
    tablesList: tablesListReducer,
  },
});
