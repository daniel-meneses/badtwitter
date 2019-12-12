import * as act from '../constants/acts.js';

const initialState = {
  subscription_requests: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case act.PENDING_SUBSCRIPTION_REQUESTS:
      return {
        ...state,
        subscription_requests: action.response,
      };
    default:
      return state;
  }
}
