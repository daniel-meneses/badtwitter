import api from '../api/api.js';
import * as follow from '../constants/followers.js';
import * as globals from '../constants/globalObject.js';

export function getFollowers() {
  return dispatch => {
    dispatch({ type: follow.GET_FOLLOWERS })
    api.fetch('/user_device/follower', {accepted: true})
      .then((response) => {
        console.log(response)
        dispatch({ type: globals.GET_USERS_SUCCESS, response });
        dispatch({ type: follow.GET_FOLLOWERS_SUCCESS, response })
      })
      .catch((e) => {
        dispatch({ type: follow.GET_FOLLOWERS_FAILURE })
      });
  }
}

export function getFollowRequests(data) {
  return dispatch => api.fetch('/user_device/follower', data)
    .then((response) => {
      dispatch({ type: "hey", response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function updateFollowerRequest(data) {
  return dispatch => api.post('/user_device/follower', data)
    .then((response) => {
      dispatch({ type: follow.UPDATE_FOLLOWER_REQUEST_SUCCESS, response})
    })
    .catch((e) => {
      console.log(e)
    });
}
