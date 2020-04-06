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

export function getGlobalAtCursor(cursor) {
  var data = {afterCursor: cursor}
  return dispatch => {
    dispatch({ type: "GET_GLOBAL_FEED_AT_CURSOR"})
    api.fetch('/feed/global', data)
    .then((response) => {
      dispatch({ type: feed.GET_FEED_SUCCESS, response });
      dispatch({ type: "GET_GLOBAL_FEED_AT_CURSOR_SUCCESS", response });
    })
    .catch((e) => {
      //dispatch({ type: feed.GET_GLOBAL_FEED_FAIL, e });
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

export function getProfileFeed(userId) {
  return dispatch => {
    dispatch({ type: feed.GET_PROFILE_FEED, userId })
    api.fetch('/feed/user/' + userId)
    .then((response) => {
      dispatch({ type: feed.GET_PROFILE_FEED_SUCCESS, response });
      dispatch({ type: feed.GET_FEED_SUCCESS, response });
    })
    .catch((response) => {
      dispatch({ type: feed.GET_PROFILE_FEED_FAIL, userId, response });
    });
  }
}
