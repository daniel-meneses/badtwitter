import { combineReducers } from 'redux';
import session from './session';
import subscriptions from './subscriptions';
import feed from './feed';
import followers from './followers';
import likes from './likes'
import posts from './posts'
import account from './account';
import userProfiles from './userProfile';
import users from './users'
import ui from './ui';
import {reducer as toastrReducer} from 'react-redux-toastr';

const mainReducer = combineReducers({
  session,
  subscriptions,
  feed,
  likes,
  followers,
  userProfiles,
  account,
  post: posts,
  users,
  ui,
  toastrReducer
});

export default function (state: any, action: any) {
  return mainReducer(state,action);
}
