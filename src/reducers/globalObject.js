import * as globals from '../constants/acts.js';

const initialState = {
    users:{},
    posts:{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case globals.GET_FEED_SUCCESS:
      return {
        ...state,
        posts: Object.assign({}, state.posts, action.response.posts),
        users: Object.assign({}, state.users, action.response.users),
      };
    case globals.APPEND_NEW_USERS:
      return {
        ...state,
        users: Object.assign({}, state.users, action.response.users)
      }
    case globals.APPEND_NEW_POSTS:
      return {
        ...state,
        posts: Object.assign({}, state.posts, action.response)
      };
    default:
      return state;
  }
}
