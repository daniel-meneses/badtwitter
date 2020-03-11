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
    case "INCREMENT_LIKE":
      const post = Object.assign({}, state.posts[action.response.post_id])
      post.likes = post.likes + 1
      const postObj = { [post.id] : post}
      return {
        ...state,
        posts: Object.assign({}, state.posts, postObj)
      };
    case "DECREMENT_LIKE":
      const post2 = Object.assign({}, state.posts[action.response.post_id])
      post2.likes = post2.likes - 1
      const postObj2 = { [post2.id] : post2}
      return {
        ...state,
        posts: Object.assign({}, state.posts, postObj2)
      };
    default:
      return state;
  }
}
