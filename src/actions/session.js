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
  return dispatch => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      history.push('/');
    })
    .catch(err => console.log(err.error));
}

export function signUp(data, history) {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      history.push('/');
      })
    .catch(err => console.log(err));
}

export function logout(history) {
  return dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token_access');
      localStorage.removeItem('token_refresh');
      dispatch({ type: act.LOGOUT });
    //  window.location = "/signup";
    })
    .catch(err => console.log(err));
}

export function authenticate() {
  return dispatch => api.post('/sessions/refresh')
    .then((response) => {
      setAccessToken(response);
    })
    .catch((e) => {
      console.log(e)
      localStorage.removeItem('token');
      window.location = '/login';
    });
}
export const unauthenticate = () => ({ type: act.AUTHENTICATION_FAILURE });

export function updateFollowerRequest(data) {
  return dispatch => api.post('/followers/update', data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getUserById(data) {
  return dispatch => api.fetch('/user/' + data)
    .then((response) => {
      dispatch({ type: "ADD_USER_PROFILE", response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function postLike(data) {
  return dispatch => api.post('/like', data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getGlobalFeed() {
  return dispatch => api.fetch('/global_feed')
    .then((response) => {
      dispatch({ type: "SET_GLOBAL_FEED", response });
    })
    .catch((e) => {
      console.log(e)
    });
}
