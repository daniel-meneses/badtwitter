import api from '../api/api.js';
import * as sharedAction from '../constants/acts.js';

export function postMessage(message) {
  var data = {message: message}
  return dispatch => api.post('/post', data)
    .then((response) => {
      dispatch({type: 'HIDE_FLOATING_POST_FORM' })
      dispatch({ type: sharedAction.APPEND_NEW_POST_TO_GLOBAL_FEED, response });
      dispatch({ type: sharedAction.APPEND_NEW_POSTS, response });
    })
    .catch((e) => {
      dispatch({ type: "NEW_POST_FAILURE", e });
    });
}
