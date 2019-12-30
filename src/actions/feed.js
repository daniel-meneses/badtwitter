import api from '../api/api.js';

export function getGlobalFeed2() {
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
