import * as feed from '../constants/feed.js';

const initialState = {
  global_feed: [],
  user_feed: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case feed.SET_GLOBAL_FEED:
      return {
        ...state,
        global_feed: action.response.data,
      };
    case feed.SET_USER_FEED:
      return {
        ...state,
        user_feed: action.response.data,
      };
    default:
      return state;
  }
}
