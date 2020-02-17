import api from '../api/api.js';
import * as feed from '../constants/acts.js';

export function getGlobalFeed() {
  return dispatch => {
    dispatch({ type: feed.GET_GLOBAL_FEED })
    api.fetch('/feed/global')
    .then((response) => {
      dispatch({ type: feed.GET_FEED_SUCCESS, response });
      dispatch({ type: feed.GET_GLOBAL_FEED_SUCCESS, response });
    })
    .catch((e) => {
      dispatch({ type: feed.GET_GLOBAL_FEED_FAIL, e });
    });
  }
}

export function getSubscriptionFeed() {
  return dispatch => {
    dispatch({ type: feed.GET_GLOBAL_FEED })
    api.fetch('/feed/global')
    .then((response) => {
      dispatch({ type: feed.GET_GLOBAL_FEED_SUCCESS, response });
    })
    .catch((e) => {
      dispatch({ type: feed.GET_GLOBAL_FEED_FAIL, e });
    });
  }
}

export function getProfileFeed(data) {
  return dispatch => {
    dispatch({ type: feed.GET_PROFILE_FEED })
    api.fetch('/feed/user/' + data)
    .then((response) => {
      dispatch({ type: feed.GET_PROFILE_FEED_SUCCESS, response });
      dispatch({ type: feed.GET_FEED_SUCCESS, response });
    })
    .catch((e) => {
      dispatch({ type: feed.GET_PROFILE_FEED_FAIL, e });
      console.log(e)
    });
  }
}
