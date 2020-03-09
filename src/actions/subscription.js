import api from '../api/api.js';
import * as sub from '../constants/acts.js';

export function getPendingSubscriptionRequests(data) {
  return dispatch => api.fetch('/subscription?accepted=false', data)
    .then((response) => {
      dispatch({ type: sub.APPEND_NEW_USERS, response });
      dispatch({ type: sub.GET_PENDING_SUBSCRIPTION_REQUESTS_SUCCESS, response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getAcceptedSubscriptionRequests(data) {
  return dispatch => api.fetch('/subscription?accepted=true', data)
    .then((response) => {
      dispatch({ type: sub.APPEND_NEW_USERS, response });
      dispatch({ type: sub.GET_ACCEPTED_SUBSCRIPTION_REQUESTS_SUCCESS, response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function postSubscriptionRequest(data) {
  return dispatch => api.post('/subscription', {user_id: data})
    .then((response) => {
      dispatch({ type: sub.APPEND_NEW_USERS, response });
      dispatch({ type: "APPEND_PENDING_SUB_REQUEST", response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function deleteSubscription(data) {
  return dispatch => api.delete('/subscription/delete', data)
    .then((response) => {
      dispatch({ type: sub.UPDATE_FOLLOWER_REQUESTS_SUCCESS, response})
    })
    .catch((e) => {
      console.log(e)
    });
}
