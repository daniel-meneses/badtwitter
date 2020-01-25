import * as follow from '../constants/followers.js';

const initialState = {
    pendingRequests: {}, // object of follow objects
    pendingRequestsUserIds: [],
    acceptedRequests: {},
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case follow.GET_FOLLOWERS:
      return {
        ...state,
        isFetching: true,
      };
    case follow.GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        pendingRequests: action.users,
        pendingRequestsUserIds: [],
        isFetching: false,
        error: null,
      };
    case follow.GET_FOLLOWERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: "Failed to get followers",
        };
    default:
      return state;
  }
}
