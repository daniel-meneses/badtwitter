import { combineReducers } from 'redux';
import session from './session.js';
import subscription from './subscription.js';
import profile from './profile.js';
import feed from './feed.js';
import post from './post.js';

const mainReducer = combineReducers({
  session,
  subscription,
  profile,
  feed,
  post
});

export default function (state, action) {
  console.log(state)
  return mainReducer(state,action);
}
