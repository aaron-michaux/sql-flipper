 
import { combineReducers } from 'redux';
import dbCredentialsReducer from './db-credentials';

export default combineReducers({
    dbCredentials: dbCredentialsReducer
});

