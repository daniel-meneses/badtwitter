import api from '../api/api.js';
import * as feed from '../constants/acts.js';
import { STUB_REQ_CYPRESS_TEST } from '../constants/environment'
import globalStub from '../../cypress/fixtures/global_feed.json'

export function getGlobalFeed(headers={}) {
  if (STUB_REQ_CYPRESS_TEST) {
    return dispatch => {
      dispatch({ type: feed.GET_FEED_SUCCESS, response: globalStub });
      dispatch({ type: feed.GET_GLOBAL_FEED_SUCCESS, response: globalStub });
    }
  }
  return dispatch => {
    dispatch({ type: feed.GET_GLOBAL_FEED })
    return api.fetch('/feed/global', {}, headers)
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
  console.log('fetching...');
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

export function getProfileFeed(userId, headers={}) {
  return dispatch => {
    dispatch({ type: feed.GET_PROFILE_FEED, userId })

    return api.fetch('/feed/user/' + userId, {}, headers)
      .then((response) => {
        dispatch({ type: feed.GET_PROFILE_FEED_SUCCESS, response });
        dispatch({ type: feed.GET_FEED_SUCCESS, response });
      })
      .catch((response) => {
        dispatch({ type: feed.GET_PROFILE_FEED_FAIL, userId, response });
      });
  }
}
