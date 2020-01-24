import { combineReducers } from 'redux';
import session from './session.js';
import subscription from './subscription.js';
import feed from './feed.js';
import post from './post.js';
import followers from './followers.js';
import globalObject from './globalObject.js';


const mainReducer = combineReducers({
  session,
  subscription,
  feed,
  post,
  globalObject,
  followers
});

export default function (state, action) {
  return mainReducer(state,action);
}
