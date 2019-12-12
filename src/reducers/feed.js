import * as session from '../constants/session.js';

const initialState = {
  global_feed: [],
  user_feed: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_GLOBAL_FEED":
      return {
        ...state,
        global_feed: action.response.data,
      };
    case "SET_USER_FEED":
      return {
        ...state,
        user_feed: action.response.data,
      };
    default:
      return state;
  }
}
