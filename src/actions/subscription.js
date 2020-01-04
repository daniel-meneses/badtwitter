import api from '../api/api.js';
import * as sub from '../constants/subscription.js';

export function getPendingSubscriptionRequests(data) {
  return dispatch => api.fetch('/user_device/subscription', data)
    .then((response) => {
      dispatch({ type: sub.GET_PENDING_SUBSCRIPTION_REQUESTS_SUCCESS, response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function postSubscriptionRequest(data) {
  return dispatch => api.post('/user_device/subscription', {user_id: data})
    .then((response) => {
      dispatch({ type: sub.SUBSCRIPTION_REQUEST_SUCCESS, response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function deleteSubscription(data) {
  return dispatch => api.delete('/user_device/subscription/delete', data)
    .then((response) => {
      dispatch({ type: sub.UPDATE_FOLLOWER_REQUESTS_SUCCESS, response})
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}


export function getFollowRequests(data) {
  console.log(data)
  return dispatch => api.fetch('/user_device/follower', data)
    .then((response) => {
      dispatch({ type: sub.GET_PENDING_FOLLOW_REQUESTS_SUCCESS, response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function updateFollowerRequest(data) {
  return dispatch => api.post('/user_device/follower', data)
    .then((response) => {
      console.log(response)
      dispatch({ type: sub.UPDATE_FOLLOWER_REQUESTS_SUCCESS, response})
    })
    .catch((e) => {
      console.log(e)
    });
}
