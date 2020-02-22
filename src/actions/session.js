import api from '../api/api.js';
import * as act from '../constants/acts.js';

function setCurrentUser(dispatch, response) {
  if (response.token_refresh) {localStorage.setItem('token_refresh', JSON.stringify(response.token_refresh))}
  if (response.token_access) {setAccessToken(response)}
  dispatch({ type: act.AUTHENTICATION_SUCCESS, response });
}

function setAccessToken(response) {
  if (response.token_access) {localStorage.setItem('token_access', JSON.stringify(response.token_access))}
}

export function login(data, history) {
  return dispatch => api.post('/accounts/session', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      history.push('/');
    })
    .catch(err => console.log(err.error));
}

export function signUp(data, history) {
  return dispatch => api.post('/accounts/user', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      history.push('/');
      })
    .catch(err => console.log(err));
}

export function logout() {
  return dispatch => api.delete('/accounts/session/logout')
    .then(() => {
      localStorage.clear();
      dispatch({ type: act.LOGOUT });
      window.location = "/signup";
    })
    .catch((err) => {
      window.location = "/signup";
    })
}

export function authenticate() {
  return dispatch => api.post('/accounts/refresh')
    .then((response) => {
      setAccessToken(response);
    })
    .catch((e) => {
      console.log(e)
    //  localStorage.removeItem('token');
    //  window.location = '/login';
    });
}
export const unauthenticate = () => ({ type: act.AUTHENTICATION_FAILURE });
