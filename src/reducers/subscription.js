import * as act from '../constants/subscription.js';

const initialState = {
  subscriptions: [],
  subscription_requests: [],
  followers: [],
  follower_requests: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case act.SUBSCRIPTION_REQUEST_SUCCESS:
      return {
        ...state,
        subscription_requests: [...state.subscription_requests, {id: action.data.id, user_id: action.data.subject.id}],
      };
    case act.GET_PENDING_SUBSCRIPTION_REQUESTS_SUCCESS:
      return {
        ...state,
        subscription_requests: action.response,
      };
    case act.UPDATE_SUBSCRIPTION_REQUESTS_SUCCESS:
      return {
        ...state,
        subscription_requests: [...state.subscription_requests, action.response.subject_id],
      };
    case act.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription_requests: [...state.subscription_requests, action.response.subject_id],
      };
    case act.FOLLOW_REQUEST_SUCCESS:
      return {
        ...state,
        subscription_requests: action,
      };
    case act.GET_PENDING_FOLLOW_REQUESTS_SUCCESS:
      return {
        ...state,
        follower_requests: action.response,
      };
    case act.UPDATE_FOLLOWER_REQUESTS_SUCCESS:
      return {
        ...state,
        follower_requests: state.follower_requests.filter(req => req !== action.response.user_id),
      };
    default:
      return state;
  }
}
