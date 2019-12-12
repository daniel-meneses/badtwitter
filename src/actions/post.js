import api from '../api/api.js';

export function postMessage(data) {
  return dispatch => api.post('/post', data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}
