import api from '../api/api.js';
const url = 'https://localhost:4000/api/v1';

export function getAllPendingFollowRequests() {
  return dispatch => api.fetch('/subscribe')
    .then((response) => {
      dispatch({ type: "PENDING_SUBSCRIPTION_REQUESTS", response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getAllPendingSubscriptionRequests() {
  return dispatch => api.fetch('/subscribe')
    .then((response) => {
      dispatch({ type: "PENDING_SUBSCRIPTION_REQUESTS", response });
    })
    .catch((e) => {
      console.log(e)
    });
}
