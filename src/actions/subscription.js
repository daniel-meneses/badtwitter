import api from '../api/api.js';
const url = 'https://localhost:4000/api/v1';

export function getList() {
  return dispatch => api.fetch('/feed')
    .then((response) => {
      dispatch({ type: "PENDING_SUBSCRIPTION_REQUESTS", response });
    })
    .catch((e) => {
      console.log(e)
    });
}
