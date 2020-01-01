import api from '../api/api.js';

export function getGlobalFeed() {
  return dispatch => {
    dispatch({ type: "GET_GLOBAL_FEED" })
    api.fetch('/global_feed')
    .then((response) => {
      dispatch({ type: "GET_GLOBAL_FEED_SUCCESS", response });
    })
    .catch((e) => {
      dispatch({ type: "GET_GLOBAL_FEED_FAIL", e });
    });
  }
}

export function getProfileFeed(data) {
  return dispatch => {
    dispatch({ type: "GET_PROFILE_FEED" })
    api.fetch('/feed/' + data)
    .then((response) => {
      dispatch({ type: "GET_PROFILE_FEED_SUCCESS", response });
      console.log(response);
    })
    .catch((e) => {
      dispatch({ type: "GET_PROFILE_FEED_FAIL", e });
      console.log(e)
    });
  }
}
