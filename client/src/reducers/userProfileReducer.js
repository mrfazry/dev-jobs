import {
  GET_USER_PROFILE,
  LOAD_USER_PROFILE,
  CLEAR_CURRENT_USER_PROFILE,
} from '../actions/types';

const initialState = {
  userProfile: null,
  users: null,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_USER_PROFILE:
      return {
        ...state,
        userProfile: null,
      };
    default:
      return state;
  }
}
