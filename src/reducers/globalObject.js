import * as globals from '../constants/globalObject.js';

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
    console.log(action.response)
      return {
        ...state,
        users: Object.assign({}, state.users, action.response.users),
      };
    default:
      return state;
  }
}
