import api from '../api/api.js';
import * as session from '../constants/session.js';
const url = 'https://localhost:4000/api/v1';

function setCurrentUser(dispatch, response) {
  if (response.token_refresh) {localStorage.setItem('token_refresh', JSON.stringify(response.token_refresh))}
  if (response.token_access) {localStorage.setItem('token_access', JSON.stringify(response.token_access))}
  // response is weird
  dispatch({ type: session.AUTHENTICATION_SUCCESS, response });
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
      dispatch({ type: session.LOGOUT });
    //  window.location = "/signup";
    })
    .catch(err => console.log(err));
}

export function authenticate() {
  return dispatch => api.post('/sessions/refresh')
    .then((response) => {
      setCurrentUser(dispatch, response);
    })
    .catch((e) => {
      console.log(e)
      //localStorage.removeItem('token');
      //window.location = '/login';
    });
}

export function postMessage(data) {
  return dispatch => api.post('/post', data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function postFollowRequest(data) {
  return dispatch => api.post('/subscribe', data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function postSubscriptionRequest(data) {
  return dispatch => api.post('/subscribe', {user_id: data})
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getList() {
  return dispatch => api.fetch('/subscribe')
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function deleteFriend(data) {
  return dispatch => api.delete('/subscribe', data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function updateFollowerRequest(data) {
  return dispatch => api.post('/followers/update', data)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getAllUsers(data) {
  return dispatch => api.fetch('/users', data)
    .then((response) => {
      //console.log()
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
      console.log(response)
      dispatch({ type: "SET_GLOBAL_FEED", response });
    })
    .catch((e) => {
      console.log(e)
    });
}


export const unauthenticate = () => ({ type: session.AUTHENTICATION_FAILURE });
