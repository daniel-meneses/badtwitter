import api from '../api/api.js';
import * as act from '../constants/acts.js';

function setCurrentUser(dispatch, response) {
  //if (response.token_refresh) {localStorage.setItem('token_refresh', JSON.stringify(response.token_refresh))}
  //if (response.token_access) {setAccessToken(response)}
  dispatch({ type: act.AUTHENTICATION_SUCCESS, response });
  dispatch({ type: act.APPEND_NEW_USERS, response });
}

function setAccessToken(response) {
  if (response.token_access) {
  //  localStorage.setItem('token_access', JSON.stringify(response.token_access))
  }
}

export function login(data, history) {
  return dispatch => api.post('/accounts/session', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      history.push('/home');
    })
    .catch((error) => {
      console.log(error)
      dispatch({ type: act.AUTHENTICATION_FAILURE, error})
    })
}

export function signUp(data, history) {
  return dispatch => api.post('/accounts/user', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      history.push('/home');
      })
    .catch((error) => {
      console.log(error)
      dispatch({ type: act.AUTHENTICATION_FAILURE, error})
    })
}

export function logout(history) {
  return (dispatch) => {
    dispatch({ type: act.LOGOUT })
    api.delete('/accounts/session')
    .then(history.push("/signup"))
  //  localStorage.clear()
  }
}

export function getSessionUser(data) {
  return dispatch => api.fetch('/accounts/session', {}, data)
    .then((response) => {
      dispatch({type: "AUTHENTICATION_SUCCESS", response})
      return true
      })
    .catch((error) => {
      dispatch({ type: "AUTHENTICATION_FAILURE", error})
      return false
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
