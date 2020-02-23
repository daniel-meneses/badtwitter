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
        currentUser: Object.values(action.response.users)[0],
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
    case 'SAVE_NEW_AVATAR_SUCCESS':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: Object.values(action.response)[0].avatar
        }
      }
    default:
      return state;
  }
}
