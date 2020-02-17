import * as sub from '../constants/acts.js';

const initialState = {
    pending: {
      subscriptionRequests: {},
      userIds: [],
      isFetching: false,
      error: null
    },
    accepted: {
      subscriptionRequests: {},
      userIds: [],
      isFetching: false,
      error: null
    },
};


export default function(state = initialState, action) {
  switch (action.type) {
    case sub.GET_PENDING_SUBSCRIPTION_REQUESTS:
      return { ...state,
                pending: {
                isFetching: true,
                error: null
              }
            }
    case sub.GET_PENDING_SUBSCRIPTION_REQUESTS_SUCCESS:
      return { ...state,
                pending: {
                subscriptionRequests: action.response.subscriptions,
                userIds: Object.keys(action.response.users).map(Number),
                isFetching: false,
                error: null
              }
            }
    case sub.GET_PENDING_SUBSCRIPTION_REQUESTS_FAIL:
      return { ...state,
                pending: {
                isFetching: false,
                error: action.response.error
              }
            }
    case sub.GET_ACCEPTED_SUBSCRIPTION_REQUESTS:
      return { ...state,
                accepted: {
                isFetching: true,
                error: null
              }
            }
    case sub.GET_ACCEPTED_SUBSCRIPTION_REQUESTS_SUCCESS:
      return { ...state,
                accepted: {
                subscriptionRequests: action.response.subscriptions,
                userIds: Object.keys(action.response.users).map(Number),
                isFetching: false,
                error: null
              }
            }
    case sub.GET_ACCEPTED_SUBSCRIPTION_REQUESTS_FAIL:
      return { ...state,
              accepted: {
              isFetching: false,
              error: action.response.error
            }
          }
    default:
      return state;
  }
}
