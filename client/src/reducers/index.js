import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userProfileReducer from './userProfileReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  userProfile: userProfileReducer,
});
