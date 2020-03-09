import api from '../api/api.js';
import * as follow from '../constants/acts.js';

export function getFollowers() {
  return dispatch => {
    dispatch({ type: follow.GET_ACCEPTED_FOLLOWERS })
    api.fetch('/follower', {accepted: true})
      .then((response) => {
        dispatch({ type: follow.APPEND_NEW_USERS, response });
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
    api.fetch('/follower', {accepted: "false"})
    .then((response) => {
      dispatch({ type: follow.APPEND_NEW_USERS, response });
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
    api.post('/follower', data)
    .then((response) => {
      dispatch({ type: follow.ACCEPT_FOLLOW_REQUEST_SUCCESS, response})
      dispatch({ type: follow.APPEND_NEW_USERS, response})
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
    api.post('/follower', data)
    .then((response) => {
      dispatch({ type: follow.REJECT_FOLLOW_REQUEST_SUCCESS, response})
    })
    .catch((e) => {
      dispatch({ type: follow.REJECT_FOLLOW_REQUEST_FAILURE, e})
      console.log(e)
    });
  }
}
