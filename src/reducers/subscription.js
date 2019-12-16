import * as act from '../constants/acts.js';

const initialState = {
  subscriptions: [],
  subscription_requests: [],
  followers: [],
  follower_requests: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case act.PENDING_SUBSCRIPTION_REQUESTS:
      return {
        ...state,
        subscription_requests: action.response,
      };
    case "UPDATE_ACCEPTED_SUBSCRIPTIONS":
      return {
        ...state,
        subscriptions: action.response,
      };
    case "GET_FOLLOWER_REQUESTS_SUCCESS":
      return {
        ...state,
        follower_requests: action.response,
      };
    default:
      return state;
  }
}
