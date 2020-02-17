import * as session from '../constants/acts.js';

const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case session.AUTHENTICATION_REQUEST:
      return {
        ...state,
        willAuthenticate: true,
      };
    case session.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: true,
        currentUser: action.response.user,
      };
    case session.AUTHENTICATION_FAILURE:
      return {
        ...state,
        willAuthenticate: false,
      };
    case session.LOGOUT:
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: false,
        currentUser: {}
      };
    default:
      return state;
  }
}
