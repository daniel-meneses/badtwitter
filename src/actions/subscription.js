import api from '../api/api.js';
import * as act from '../constants/acts.js';

export function postSubscriptionRequest(data) {
  return dispatch => api.post('/subscribe', {user_id: data})
    .then((response) => {
      //dispatch({ type: act.PENDING_SUBSCRIPTION_REQUESTS, response });
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getPendingSubscriptionRequests() {
  return dispatch => api.fetch('/subscribe')
    .then((response) => {
      dispatch({ type: act.PENDING_SUBSCRIPTION_REQUESTS, response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getFollowRequests(data) {
  return dispatch => api.fetch('/followers', data)
    .then((response) => {
      dispatch({ type: "GET_FOLLOWER_REQUESTS_SUCCESS", response });
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function acceptFollowRequest(data) {
  return dispatch => api.post('/follow', data)
    .then((response) => {
      //dispatch({ type: act.PENDING_SUBSCRIPTION_REQUESTS, response });
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function deleteSubscription(data) {
  return dispatch => api.delete('/subscribe', data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}
