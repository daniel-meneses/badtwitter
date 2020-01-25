import * as act from '../constants/subscription.js';

const initialState = {
  pendingSubRequestUserIds: [],
  pendingFollowReqUserIds: [],
  follower_users: [],
  follower_ids: [],
  follower_users: {},
  follower_request_users: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case act.SUBSCRIPTION_REQUEST_SUCCESS:
      return {
        ...state,
        pendingSubRequestUserIds: [...state.pendingSubRequestUserIds, Object.keys(action.response).map(Number)[0]],
      };
    case act.GET_PENDING_SUBSCRIPTION_REQUESTS_SUCCESS:
      return {
        ...state,
        pendingSubRequestUserIds: action.response.list,
      };
    case act.UPDATE_SUBSCRIPTION_REQUESTS_SUCCESS:
      return {
        ...state,
        pendingSubRequestUserIds: [...state.pendingSubRequestUserIds, action.response.subject_id],
      };
    case act.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        pendingSubRequestUserIds: [...state.pendingSubRequestUserIds, action.response.subject_id],
      };
    case act.FOLLOW_REQUEST_SUCCESS:
      return {
        ...state,
        pendingSubRequestUserIds: action,
      };
    case act.GET_PENDING_FOLLOW_REQUESTS_SUCCESS:
      return {
        ...state,
        pendingFollowReqUserIds: action.response.list,
        follower_request_users: action.response.data_map,
      };
    case act.UPDATE_FOLLOWER_REQUESTS_SUCCESS:
      return {
        ...state,
        pendingFollowReqUserIds: state.pendingFollowReqUserIds.filter(req => Object.keys(req).map(Number)[0] !== action.response.user_id),
      };
    case act.GET_ACCEPTED_FOLLOW_REQUESTS_SUCCESS:
      return {
        ...state,
        follower_users: action.response.list,
        follower_users: action.response.data_map,
      };
    default:
      return state;
  }
}
