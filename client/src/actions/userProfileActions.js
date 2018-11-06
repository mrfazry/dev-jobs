import axios from 'axios';

import {
  GET_USER_PROFILE,
  LOAD_USER_PROFILE,
  CLEAR_CURRENT_USER_PROFILE,
} from './types';

//get current user profile
export const getCurrentUserProfile = () => dispatch => {
  dispatch(setUserProfileLoading());
  axios
    .get('api/user')
    .then(res => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: {},
      });
    });
};

//load user profile
export const setUserProfileLoading = () => {
  return {
    type: LOAD_USER_PROFILE,
  };
};

//clear current user profile
export const clearCurrentUserProfile = () => {
  return {
    type: CLEAR_CURRENT_USER_PROFILE,
  };
};
