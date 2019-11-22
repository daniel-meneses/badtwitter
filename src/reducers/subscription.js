import * as session from '../constants/session.js';

const initialState = {
  subscription_requests: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "PENDING_SUBSCRIPTION_REQUESTS":
    console.log(action.response.data)
      return {
        ...state,
        subscription_requests: action.response.data,
      };
    default:
      return state;
  }
}
