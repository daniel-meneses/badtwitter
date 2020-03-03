import * as session from '../constants/acts.js';

const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {},
  error: null
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
    console.log(action.error)
      return {
        ...state,
        willAuthenticate: false,
        error: action.error
      };
    case session.LOGOUT:
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: false,
        currentUser: {},
        error: null
      };
    case 'SAVE_NEW_AVATAR_SUCCESS':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: Object.values(action.response)[0].avatar
        }
    }
    case 'UPDATE_BIO_SUCCESS':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          bio: Object.values(action.response)[0].bio
        }
    }
    default:
      return state;
  }
}
