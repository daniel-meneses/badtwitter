import { combineReducers } from 'redux';
import session from './session.js';
import subscription from './subscription.js';
import profile from './profile.js';
import feed from './feed.js';

const mainReducer = combineReducers({
  session,
  subscription,
  profile,
  feed
});

export default function (state, action) {
  return mainReducer(state,action);
}
