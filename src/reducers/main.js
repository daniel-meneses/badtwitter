import { combineReducers } from 'redux';
import session from './session.js';
import subscriptions from './subscriptions.js';
import feed from './feed.js';
import post from './post.js';
import followers from './followers.js';
import globalObject from './globalObject.js';
import likes from './likes.js';
import profileEdit from './profileEdit.js';

const mainReducer = combineReducers({
  session,
  subscriptions,
  feed,
  post,
  likes,
  globalObject,
  followers,
  profileEdit
});

export default function (state, action) {
  return mainReducer(state,action);
}
