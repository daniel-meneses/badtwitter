import * as session from '../constants/session.js';

const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {},
  socket: null,
  all_users: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case session.AUTHENTICATION_REQUEST:
      return {
        ...state,
        willAuthenticate: true,
      };
    case session.AUTHENTICATION_SUCCESS:
    console.log("AUTHENTICATION_SUCCESS was hit" )
    console.log(action.response.data)
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: true,
        currentUser: action.response.data,
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
        currentUser: {},
        socket: null,
      };
    case session.SOCKET_CONNECTED:
      return {
        ...state,
        socket: action.socket,
      };
    case "GET_ALL_USERS":
      return {
        ...state,
        all_users: action.users,
      };
    default:
      return state;
  }
}
