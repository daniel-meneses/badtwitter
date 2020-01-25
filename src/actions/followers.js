import api from '../api/api.js';
import * as follow from '../constants/followers.js';
import * as globals from '../constants/globalObject.js';

export function getFollowers() {
  return dispatch => {
    dispatch({ type: follow.GET_ACCEPTED_FOLLOWERS })
    api.fetch('/user_device/follower', {accepted: true})
      .then((response) => {
        dispatch({ type: globals.GET_USERS_SUCCESS, response });
        dispatch({ type: follow.GET_ACCEPTED_FOLLOWERS_SUCCESS, response })
      })
      .catch((e) => {
        dispatch({ type: follow.GET_ACCEPTED_FOLLOWERS_FAILURE })
      });
  }
}

export function getPendingFollowRequests() {
  return dispatch => {
    dispatch({ type: follow.GET_PENDING_FOLLOW_REQUESTS })
    api.fetch('/user_device/follower', {accepted: "false"})
    .then((response) => {
      dispatch({ type: follow.GET_PENDING_FOLLOW_REQUESTS_SUCCESS, response });
    })
    .catch((e) => {
      dispatch({ type: follow.GET_PENDING_FOLLOW_REQUESTS_FAILURE, e });
      console.log(e)
    });
  }
}

export function acceptFollowerRequest(data) {
  return dispatch => {
    dispatch({ type: follow.ACCEPT_FOLLOW_REQUEST })
    api.post('/user_device/follower', data)
    .then((response) => {
      dispatch({ type: follow.ACCEPT_FOLLOW_REQUEST_SUCCESS, response})
    })
    .catch((e) => {
      dispatch({ type: follow.ACCEPT_FOLLOW_REQUEST_FAILURE, e})
      console.log(e)
    });
  }
}

export function rejectFollowerRequest(data) {
  return dispatch => {
    dispatch({ type: follow.REJECT_FOLLOW_REQUEST })
    api.post('/user_device/follower', data)
    .then((response) => {
      dispatch({ type: follow.REJECT_FOLLOW_REQUEST_SUCCESS, response})
    })
    .catch((e) => {
      dispatch({ type: follow.REJECT_FOLLOW_REQUEST_FAILURE, e})
      console.log(e)
    });
  }
}
