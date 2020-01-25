import * as follow from '../constants/followers.js';

const initialState = {
    pending: {
      followRequests: {},
      listUserIds: [],
      isFetching: false,
      error: null
    },
    accepted: {
      followRequests: {},
      listUserIds: [],
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
          isFetching: true
        }
      };
    case follow.GET_ACCEPTED_FOLLOWERS_SUCCESS:
      return {
        ...state,
        accepted: {
          followRequests: action.response.followers,
          listUserIds: Object.keys(action.response.users).map(Number),
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
          isFetching: true
        }
      };
    case follow.GET_PENDING_FOLLOW_REQUESTS_SUCCESS:
      return {
        ...state,
        pending: {
          followRequests: action.response.followers,
          listUserIds: Object.keys(action.response.users).map(Number),
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
      return {
        ...state,
        pending: {
          followRequests: state.followers.pending.followRequests.filter(req => Object.keys(req).map(Number)[0] !== action.response.followers.user_id),
        },
        accepted: {
          followRequests: Object.assign({}, state.accepted.followRequests, action.response.follwers),
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
