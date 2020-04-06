import api2 from './api2.js'

export function getSessionUser(data) {
  return dispatch => api2.fetch('/accounts/session', data)
    .then((response) => {
      dispatch({type: "AUTHENTICATION_SUCCESS", response})
      return true
      })
    .catch((error) => {
      dispatch({ type: "AUTHENTICATION_FAILURE", error})
      return false
    })
}

export function getGlobalFeed(data) {
  return dispatch => api2.fetch('/feed/global', data)
    .then((response) => {
      dispatch({ type: "GET_FEED_SUCCESS", response });
      dispatch({ type: "GET_GLOBAL_FEED_SUCCESS", response });
      })
    .catch((error) => {
      dispatch({ type: "GET_GLOBAL_FEED_FAIL", error})
    })
}
