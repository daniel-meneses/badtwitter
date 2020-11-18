import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { Follower, Followers } from '../types/common';
import { createReqReducer } from './common'

type iniitalState = {
    pending: number[];
    accepted: number[];
    byId: any;
}

let iniitalState: iniitalState = {
    pending: [],
    accepted: [],
    byId: {}
}

export enum FollowersActionTypes {
    APPEND_FOLLOWWERS = 'APPEND_FOLLOWWERS',
    APPEND_ACCEPTED = 'APPEND_ACCEPTED',
    APPEND_PENDING = 'APPEND_PENDING',
    ACCEPT_FOLLOW = 'ACCEPT_FOLLOW',
    REJECT_FOLLOW = 'REJECT_FOLLOW'
}

export enum FollowersReqActionTypes {
    GET_ACCEPTED_FOLLOWERS = 'GET_ACCEPTED_FOLLOWERS',
    GET_PENDING_FOLLOWERS = 'GET_PENDING_FOLLOWERS',
    UPDATE_PENDING_FOLLOW_REQUEST = 'UPDATE_PENDING_FOLLOW_REQUEST'
}


export const selectFollowRequests = (state: RootState): Followers => state.followers.followers.byId;
export const selectAcceptedFollowerIds = (state: RootState): number[] => state.followers.followers.accepted;
export const selectPendingFollowerIds = (state: RootState): number[] => state.followers.followers.pending;

export const selectAcceptedFollowRequests = createSelector(
  [selectFollowRequests, selectAcceptedFollowerIds],
  (followReqs, acceptedFollowers) => {
    return acceptedFollowers.reduce((o, id) => ({ ...o, [id]: followReqs[id]}), {})
   }
)

export const selectPendingFollowRequests = createSelector(
  [selectFollowRequests, selectPendingFollowerIds],
  (followReqs, pendingFollowers) => {
    return pendingFollowers.reduce((o, id) => ({ ...o, [id]: followReqs[id]}), {})
   }
)


function formatFollowersResponse(follower: {[id: string]: any}) {
  let followState: {[id: string] : Follower} = {}
  Object.values(follower).forEach( (follow: any) => {
    followState[`${follow.id}`] = formatFollower(follow);
  })
  return followState
}

function formatFollower(follower: any): any {
  const { id, inserted_at: insertedAt, user_id: userId } = follower
  return ({
    id, insertedAt, userId
  })
}


const followers = (state = iniitalState, action: any) => {
  switch (action.type) {
    case FollowersActionTypes.APPEND_FOLLOWWERS:
      var { followers } = action.response
      var formattedFollowers = formatFollowersResponse(followers)
      return {
        ...state,
        byId: Object.assign({}, state.byId, formattedFollowers)
      };
    case FollowersActionTypes.APPEND_ACCEPTED:
      var { followers } = action.response
      var followIds = Object.keys(followers).map(Number)
      return {
        ...state,
        accepted: [...new Set([...state.accepted, ...followIds])]
      };
    case FollowersActionTypes.APPEND_PENDING:
      var { followers } = action.response
      var followIds = Object.keys(followers).map(Number)
      return {
        ...state,
        pending: [...new Set([...state.pending, ...followIds])]
      };
    case FollowersActionTypes.ACCEPT_FOLLOW:
      var followId = Object.keys(action.response.follow)[0]
      var fId = parseInt(followId)
      return {
        ...state,
        accepted: [...state.accepted, fId],
        pending: state.pending.filter(id => id !== fId ),
      };
    case FollowersActionTypes.REJECT_FOLLOW:
      var followId = Object.keys(action.response.follow)[0]
      var fId = parseInt(followId)
      return {
        ...state,
        pending: state.pending.filter(id => id !== fId ),
      };
    default:
      return state;
  }
}

const followersReducer = combineReducers({
    followers,
    getAcceptedFollowers: createReqReducer(FollowersReqActionTypes.GET_ACCEPTED_FOLLOWERS),
    getPendingFollowers: createReqReducer(FollowersReqActionTypes.GET_PENDING_FOLLOWERS),
  })
  
export default followersReducer;
