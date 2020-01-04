import api from '../api/api.js';

export function postLike(data) {
  return dispatch => api.post('/user_device/like', data)
    .then((response) => {
      dispatch({ type: "LIKE_POST_SUCCESS", response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getAllUserLikes(data) {
  return dispatch => api.fetch('/user_device/like')
    .then((response) => {
      dispatch({ type: "UPDATE_HAS_BEEN_LIKED", response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function deleteLike(data) {
  return dispatch => api.delete('/user_device/like/delete', data)
  .then((response) => {
    dispatch({ type: "DELETE_POST_SUCCESS", response });
  })
  .catch((e) => {
    console.log(e)
  });
}
