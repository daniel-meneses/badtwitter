import api from '../api/api.js';
const url = 'https://localhost:4000/api/v1';

export function getAllFollowerRequests() {
  return dispatch => api.fetch('/subscribe')
    .then((response) => {
      dispatch({ type: "PENDING_SUBSCRIPTION_REQUESTS", response });
    })
    .catch((e) => {
      console.log(e)
    });
}
