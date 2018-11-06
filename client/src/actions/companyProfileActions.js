import axios from 'axios';

import {
  GET_COMPANY_PROFILE,
  LOAD_COMPANY_PROFILE,
  CLEAR_CURRENT_COMPANY_PROFILE,
} from './types';

//get current company profile
export const getCurrentCompanyProfile = () => dispatch => {
  dispatch(setCompanyProfileLoading());
  axios
    .get('api/company')
    .then(res => {
      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: {},
      });
    });
};

//load company profile
export const setCompanyProfileLoading = () => {
  return {
    type: LOAD_COMPANY_PROFILE,
  };
};

//clear current company profile
export const clearCurrentCompanyProfile = () => {
  return {
    type: CLEAR_CURRENT_COMPANY_PROFILE,
  };
};
