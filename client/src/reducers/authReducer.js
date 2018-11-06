import isEmpty from '../validation/is_empty';

import { SET_CURRENT_ACCOUNT } from '../actions/types';
//import { GET_ERRORS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  account: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ACCOUNT:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        account: action.payload,
      };
    default:
      return state;
  }
}
