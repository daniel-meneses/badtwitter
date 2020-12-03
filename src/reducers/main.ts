import { combineReducers } from 'redux';
import session from './session';
import subscriptions from './subscriptions';
import feeds from './feeds';
import likes from './likes'
import account from './account';
import ui from './ui';
import global from './globalObjects';
import explore from './explore';
import {reducer as toastrReducer} from 'react-redux-toastr';

const mainReducer = combineReducers({
  session,
  subscriptions,
  global,
  feeds,
  likes,
  account,
  ui,
  explore,
  toastrReducer
});

export default function (state: any, action: any) {
  return mainReducer(state,action);
}
