import {
  GET_COMPANY_PROFILE,
  LOAD_COMPANY_PROFILE,
  CLEAR_CURRENT_COMPANY_PROFILE,
} from '../actions/types';

const initialState = {
  companyProfile: null,
  companies: null,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMPANY_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_COMPANY_PROFILE:
      return {
        ...state,
        companyProfile: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_COMPANY_PROFILE:
      return {
        ...state,
        companyProfile: null,
      };
    default:
      return state;
  }
}
