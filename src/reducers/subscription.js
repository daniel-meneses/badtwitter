import * as act from '../constants/subscription.js';

const initialState = {
  subscriptions: [],
  subscription_request_ids: [],
  follower_ids: [],
  follower_users: {},
  follower_request_ids: [],
  follower_request_users: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case act.SUBSCRIPTION_REQUEST_SUCCESS:
      return {
        ...state,
        subscription_request_ids: [...state.subscription_request_ids, Object.keys(action.response.data).map(Number)[0]],
      };
    case act.GET_PENDING_SUBSCRIPTION_REQUESTS_SUCCESS:
      return {
        ...state,
        subscription_request_ids: action.response.list,
      };
    case act.UPDATE_SUBSCRIPTION_REQUESTS_SUCCESS:
      return {
        ...state,
        subscription_request_ids: [...state.subscription_request_ids, action.response.subject_id],
      };
    case act.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription_request_ids: [...state.subscription_request_ids, action.response.subject_id],
      };
    case act.FOLLOW_REQUEST_SUCCESS:
      return {
        ...state,
        subscription_request_ids: action,
      };
    case act.GET_PENDING_FOLLOW_REQUESTS_SUCCESS:
      return {
        ...state,
        follower_request_ids: action.response.list,
        follower_request_users: action.response.data_map,
      };
    case act.UPDATE_FOLLOWER_REQUESTS_SUCCESS:
      return {
        ...state,
        follower_request_ids: state.follower_request_ids.filter(req => Object.keys(req).map(Number)[0] !== action.response.user_id),
      };
    case act.GET_ACCEPTED_FOLLOW_REQUESTS_SUCCESS:
      return {
        ...state,
        follower_ids: action.response.list,
        follower_users: action.response.data_map,
      };
    default:
      return state;
  }
}
