import api from '../api/api.js';
import * as sharedAction from '../constants/acts.js';

export function postMessage(data) {
  return dispatch => api.post('/user_device/post', data)
    .then((response) => {
      dispatch({ type: sharedAction.APPEND_NEW_POST_TO_GLOBAL_FEED, response });
    })
    .catch((e) => {
      dispatch({ type: "NEW_POST_FAILURE", e });
      console.log(e)
    });
}
