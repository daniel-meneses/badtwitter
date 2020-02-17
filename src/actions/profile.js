import api from '../api/api.js'
import * as act from '../constants/acts.js'
const IMAGE_URL = 'https://images-03.s3-ap-southeast-2.amazonaws.com/'

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

export function postImageToPresignedURL(url, data) {
  return dispatch => {
    dispatch({ type: "UPLOAD_NEW_AVATAR" });
    api.postImage(url, data)
    .then((response) => {
      dispatch({ type: "UPLOAD_NEW_AVATAR_SUCCESS", data });
      let imgData = {image : url.split("?")[0]}
      api.post('/accounts/avatar', imgData)
          .then((response) => {console.log(response)})
          .catch((error) => {console.log(error)})
    })
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      dispatch({ type: "UPLOAD_NEW_AVATAR_FAILURE", e });
    });
  }
}

export function saveNewProfileImage(data) {
  return dispatch => {
    api.post('/accounts/avatar', data)
    .then((response) => {
      dispatch({ type: "SAVE_NEW_AVATAR_SUCCESS", response });
    })
    .catch((e) => {
      dispatch({ type: "SAVE_NEW_AVATAR_FAILURE", e });
    });
  }
}
