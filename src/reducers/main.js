import { combineReducers } from 'redux';
import session from './session.js';
import subscription from './subscription.js';
import feed from './feed.js';
import post from './post.js';
import followers from './followers.js';
import globalObject from './globalObject.js';
import likes from './likes.js';

const mainReducer = combineReducers({
  session,
  subscription,
  feed,
  post,
  likes,
  globalObject,
  followers
});

export default function (state, action) {
  return mainReducer(state,action);
}
