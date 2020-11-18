import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { FetchRequest } from '../types/common';
import { createReqReducer  } from './common';

export enum UserProfileReqActionTypes {
    GET_USER_PROFILE = 'GET_USER_PROFILE',
}

export enum UserProfileActionTypes {
    APPEND_USER_PROFILE = 'APPEND_USER_PROFILE',
}

export interface IFeed extends Request {
  timeline: number[];
  nextCursor: string | null;
}

export interface UserProfile extends IFeed {
  userId: number;
}

export const selectUserProfiles = (state: RootState) => state.userProfiles.userProfiles.byUserId;
export const selectFetchProfileReq = (state: RootState): FetchRequest => state.userProfiles.getUserProfileReq

export const selectUserProfileById = createSelector(
  [selectUserProfiles, (state: RootState, userId: number) => userId],
  (userProfiles, userId) => userProfiles[userId]
)

const userProfiles = (state: any = { byUserId: {}}, action: any): any => {
  switch (action.type) {
    case UserProfileActionTypes.APPEND_USER_PROFILE:
      let { byUserId } = state;
      let { timeline, users } = action.response;
      let userId = Object.keys(users)[0];
      let profile = byUserId[userId] || {};
      let feed = profile.timeline ? [...new Set([...profile.timeline, ...timeline])] : timeline;
      let userObj = {[userId] : { timeline: feed }};      
      return {
        byUserId: Object.assign({}, state.byUserId, userObj)
      }
    default:
      return state;
  }
}

const userProfilesReducer = combineReducers({
  userProfiles,
  getUserProfileReq: createReqReducer(UserProfileReqActionTypes.GET_USER_PROFILE),
})

export default userProfilesReducer;
