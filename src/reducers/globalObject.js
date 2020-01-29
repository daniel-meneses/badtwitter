import * as globals from '../constants/globalObject.js';
import * as sharedAction from '../constants/sharedAction.js';


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
    case globals.GET_USERS_SUCCESS:
      return {
        ...state,
        users: Object.assign({}, state.users, action.response.users),
      };
    case sharedAction.APPEND_NEW_POST_TO_GLOBAL_FEED:
      return {
        ...state,
        posts: Object.assign({}, state.posts, action.response),
      };
    default:
      return state;
  }
}
