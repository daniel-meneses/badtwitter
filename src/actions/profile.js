import api from '../api/api.js';
import * as act from '../constants/acts.js';

export function setNewProfileImage(url, data) {
  return dispatch => {
    console.log(data)
    api.postImage(url, data)
    .then((response) => {
      dispatch({ type: "UPLOAD_NEW_AVATAR_SUCCESS", response });
      console.log(response)
    })
    .catch((e) => {
      dispatch({ type: "UPLOAD_NEW_AVATAR_FAILURE", e });
      console.log(e)
    });
  }
}

export function getPresignedUrl() {
  return dispatch => {
    dispatch({ type: "FETCH_PRESIGNED_URL" })
    api.post('/accounts/avatar')
    .then((response) => {
      dispatch({ type: "FETCH_PRESIGNED_URL_SUCCESS", response })
    })
    .catch((error) => {
      dispatch({ type: "FETCH_PRESIGNED_URL_FAILURE", error })
    });
  }
}
