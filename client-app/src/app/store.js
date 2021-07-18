
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import dbCredentialsReducer from '../features/db-credentials-dialog/dbCredentialsSlice';
import mainWindowReducer from '../features/main-window/mainWindowSlice';
import tablesListReducer from '../features/tables-list/tablesListSlice';
import queryWindowReducer from '../features/query-window/queryWindowSlice';

// The Store
export const store = configureStore({
  reducer: {
    mainWindow: mainWindowReducer,
    dbCredentials: dbCredentialsReducer,
    tablesList: tablesListReducer,
    queryWindow: queryWindowReducer,
  },
});


