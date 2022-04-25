import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dataReducer from './dataReducer';

const appReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
});

export default appReducer;
