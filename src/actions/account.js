import api from '../api/api.js'

export function getPresignedUrl() {
  return dispatch => {
    dispatch({ type: "FETCH_PRESIGNED_URL" })
    api.fetch('/accounts/user/avatar/presigned')
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
      api.post('/accounts/user/avatar', imgData)
          .then((response) => {
                dispatch({ type: "SAVE_NEW_AVATAR_SUCCESS", response });
                })
          .catch((error) => {console.log(error)})
    })
    .catch((e) => {
      dispatch({ type: "UPLOAD_NEW_AVATAR_FAILURE", e });
    });
  }
}

export function saveNewProfileImage(data) {
  return dispatch => {
    api.post('/accounts/user/avatar/update', data)
    .then((response) => {
      dispatch({ type: "SAVE_NEW_AVATAR_SUCCESS", response });
    })
    .catch((e) => {
      dispatch({ type: "SAVE_NEW_AVATAR_FAILURE", e });
    });
  }
}

export function editProfileBio(data) {
  return dispatch => {
    api.post('/accounts/user/update', data)
    .then((response) => {
      dispatch({ type: "UPDATE_BIO_SUCCESS", response });
    })
    .catch((e) => {
      dispatch({ type: "SAVE_NEW_AVATAR_FAILURE", e });
    });
  }
}
