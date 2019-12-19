import api from '../api/api.js';
import * as act from '../constants/acts.js';

export function postSubscriptionRequest(data) {
  return dispatch => api.post('/subscribe', {user_id: data})
    .then((response) => {
      dispatch({ type: "SUBSCRIPTION_REQUEST_SUCCESS", response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getPendingSubscriptionRequests(data) {
  return dispatch => api.fetch('/subscription', data)
    .then((response) => {
      dispatch({ type: "GET_PENDING_SUBSCRIPTION_REQUESTS_SUCCESS", response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getFollowRequests(data) {
  console.log(data)
  return dispatch => api.fetch('/followers', data)
    .then((response) => {
      dispatch({ type: "GET_PENDING_FOLLOW_REQUESTS_SUCCESS", response });
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function updateFollowerRequest(data) {
  return dispatch => api.post('/followers/update', data)
    .then((response) => {
      dispatch({ type: "UPDATE_FOLLOWER_REQUESTS_SUCCESS", response})
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function deleteSubscription(data) {
  return dispatch => api.delete('/subscribe', data)
    .then((response) => {
      dispatch({ type: "UPDATE_FOLLOWER_REQUESTS_SUCCESS", response})
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}
