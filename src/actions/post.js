import api from '../api/api.js';

export function postMessage(data) {
  return dispatch => api.post('/user_device/post', data)
    .then((response) => {
      dispatch({ type: "NEW_POST_SUCCESS", response });
      console.log(response)
    })
    .catch((e) => {
      dispatch({ type: "NEW_POST_FAILURE", e });
      console.log(e)
    });
}
