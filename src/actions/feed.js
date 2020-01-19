import api from '../api/api.js';
import * as feed from '../constants/feed.js';

const URL_FEED_GLOBAL = "/feed/global";
const URL_FEED_EXPLORE = "/feed/explore";
const URL_FEED_SUBSCRIPTIONS = "/feed/subscriptions";
const URL_FEED_USER = "/feed/user/";

export function getGlobalFeed() {
  return dispatch => {
    dispatch({ type: feed.GET_GLOBAL_FEED })
    api.fetch(URL_FEED_GLOBAL)
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
    api.fetch(URL_FEED_USER + data)
    .then((response) => {
      dispatch({ type: feed.GET_PROFILE_FEED_SUCCESS, response });
      console.log(response);
    })
    .catch((e) => {
      dispatch({ type: feed.GET_PROFILE_FEED_FAIL, e });
      console.log(e)
    });
  }
}
