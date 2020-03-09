import api from '../api/api.js';
import * as likes from '../constants/acts.js';

export function postLike(postId) {
  let data = {post_id: postId};
  return dispatch => api.post('/like', data)
    .then((response) => {
      dispatch({ type: likes.LIKE_POST_SUCCESS, response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function getAllUserLikes(data) {
  return dispatch => api.fetch('/like')
    .then((response) => {
      dispatch({ type: likes.GET_LIKED_POSTS_SUCCESS, response });
    })
    .catch((e) => {
      console.log(e)
    });
}

export function deleteLike(postId) {
  let data = {post_id: postId};
  return dispatch => api.delete('/like/delete', data)
  .then((response) => {
    dispatch({ type: likes.UNLIKE_POST_SUCCESS, response });
  })
  .catch((e) => {
    console.log(e)
  });
}
