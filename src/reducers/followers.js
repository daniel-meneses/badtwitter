import * as follow from '../constants/acts.js';

const initialState = {
    pending: {
      followRequests: {},
      userIds: [],
      isFetching: false,
      error: null
    },
    accepted: {
      followRequests: {},
      userIds: [],
      isFetching: false,
      error: null
    },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case follow.GET_ACCEPTED_FOLLOWERS:
      return {
        ...state,
        accepted: {
          isFetching: true,
          error: null
        }
      };
    case follow.GET_ACCEPTED_FOLLOWERS_SUCCESS:
      return {
        ...state,
        accepted: {
          followRequests: action.response.followers,
          userIds: Object.keys(action.response.users).map(Number),
          isFetching: false,
          error: null
        }
      };
    case follow.GET_ACCEPTED_FOLLOWERS_FAILURE:
      return {
        ...state,
        accepted: {
          isFetching: false,
          error: "Failed to get followers"
        }
      };
    case follow.GET_PENDING_FOLLOW_REQUESTS:
      return {
        ...state,
        pending: {
          isFetching: true,
          error: null
        }
      };
    case follow.GET_PENDING_FOLLOW_REQUESTS_SUCCESS:
      return {
        ...state,
        pending: {
          followRequests: action.response.followers,
          userIds: Object.keys(action.response.users).map(Number),
          isFetching: false,
          error: null
        }
      };
    case follow.GET_PENDING_FOLLOW_REQUESTS_FAILURE:
      return {
        ...state,
        pending: {
          isFetching: false,
          error: "Failed to get followers"
        }
      }
    case follow.ACCEPT_FOLLOW_REQUEST_SUCCESS:
        const { [Object.keys(action.response.follow)[0]] : user_id, ...pendingFollowRequests} = state.pending.followRequests
        console.log(pendingFollowRequests)
      return {
        ...state,
        pending: {
          followRequests: pendingFollowRequests,
        },
        accepted: {
          followRequests: Object.assign({}, state.accepted.followRequests, action.response.follow),
        }
      }
    case follow.REJECT_FOLLOW_REQUEST_SUCCESS:
      return {
        ...state,
        pending: {
          followRequests: state.followers.pending.followRequests.filter(req => Object.keys(req).map(Number)[0] !== action.response.followers.user_id),
        }
      }
    default:
      return state;
  }
}
