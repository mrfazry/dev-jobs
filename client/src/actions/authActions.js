import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_ACCOUNT } from './types';

// register account
export const registerAccount = (
  accountData,
  submitType,
  history
) => dispatch => {
  if (submitType === 'userSubmit') {
    axios
      .post('api/accounts/user/register', accountData)
      .then(res => history.push('/login'))
      .catch(err => {
        const tempErrors = {};
        tempErrors.userEmail = err.response.data.email;
        tempErrors.userPassword = err.response.data.password;
        tempErrors.userPassword2 = err.response.data.password2;
        dispatch({
          type: GET_ERRORS,
          payload: tempErrors,
        });
      });
  } else if (submitType === 'companySubmit') {
    axios
      .post('api/accounts/company/register', accountData)
      .then(res => history.push('/login'))
      .catch(err => {
        const tempErrors = {};
        tempErrors.companyEmail = err.response.data.email;
        tempErrors.companyPassword = err.response.data.password;
        tempErrors.companyPassword2 = err.response.data.password2;
        dispatch({
          type: GET_ERRORS,
          payload: tempErrors,
        });
      });
  }
};

//log account in
export const loginAccount = (accountData, submitType) => dispatch => {
  if (submitType === 'userSubmit') {
    axios
      .post('api/accounts/user/login', accountData)
      .then(res => {
        //save to localStorage
        const { token } = res.data;

        //set token to localStorage
        localStorage.setItem('jwtToken', token);

        //set token to auth header
        setAuthToken(token);

        //decode token to get user data
        const decoded = jwt_decode(token);

        //console.log(token, decoded);

        //set current account
        dispatch(setCurrentAccount(decoded));
      })
      .catch(err => {
        const tempErrors = {};
        tempErrors.userEmail = err.response.data.email;
        tempErrors.userPassword = err.response.data.password;
        dispatch({
          type: GET_ERRORS,
          payload: tempErrors,
        });
      });
  } else if (submitType === 'companySubmit') {
    axios
      .post('api/accounts/company/login', accountData)
      .then(res => {
        //save to localStorage
        const { token } = res.data;

        //set token to localStorage
        localStorage.setItem('jwtToken', token);

        //set token to auth header
        setAuthToken(token);

        //decode token to get user data
        const decoded = jwt_decode(token);

        //console.log(token, decoded);

        //set current account
        dispatch(setCurrentAccount(decoded));
      })
      .catch(err => {
        const tempErrors = {};
        tempErrors.companyEmail = err.response.data.email;
        tempErrors.companyPassword = err.response.data.password;
        dispatch({
          type: GET_ERRORS,
          payload: tempErrors,
        });
      });
  }
};

//set logged in user
export const setCurrentAccount = decoded => {
  return {
    type: SET_CURRENT_ACCOUNT,
    payload: decoded,
  };
};

//log account out
export const logoutAccount = () => dispatch => {
  //remove token from localStorage
  localStorage.removeItem('jwtToken');

  //remove auth header for next requests
  setAuthToken(false);

  //set current account to empty object, affecting authReducer
  dispatch(setCurrentAccount({}));
};
