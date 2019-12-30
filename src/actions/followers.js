import api from '../api/api.js';
import * as sub from '../constants/subscription.js';

export function getFollowers() {
  return dispatch => {
    dispatch({ type: sub.GET_NEW_FOLLOWERS })
    api.fetch('/followers', {accepted: true})
      .then((response) => {
        dispatch({ type: sub.GET_NEW_FOLLOWERS_SUCCESS, response })
      })
      .catch((e) => {
        dispatch({ type: sub.GET_NEW_FOLLOWERS_FAIL })
      });
  }
}
