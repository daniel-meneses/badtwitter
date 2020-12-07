import { Dispatch } from 'redux';
import * as actions from './common'
import api from '../api/api';
import { LikeActionTypes, LikeReqActionTypes } from '../reducers/likes'
import { GlobalActionTypes } from '../reducers/globalObjects';

export function likeUserPost(postId: number) {
  let data = { post_id: postId };
  let type = LikeReqActionTypes.POST_LIKE
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type))
    return api.post('/like', data)
      .then((response) => {
        dispatch(actions.reqSuccess(type))
        dispatch({ type: LikeActionTypes.APPEND_LIKE, response });
        dispatch({ type: GlobalActionTypes.INCREMENT_POST_LIKE, response });
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error))
      });
  }
}

export function getAllLikes() {
  let type = LikeReqActionTypes.GET_ALL_LIKES
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type))
    api.fetch('/like')
      .then((response) => {
        dispatch(actions.reqSuccess(type))
        dispatch({type: LikeActionTypes.SET_ALL_LIKES, response})
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error))
      });
  }
}

export function unlikeUserPost(postId: number) {
  let data = {post_id: postId};
  let type = LikeReqActionTypes.DELETE_LIKE
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type))
    return api.delete('/like/delete', data)
    .then((response) => {
      dispatch(actions.reqSuccess(type))
      dispatch({ type: LikeActionTypes.REMOVE_LIKE, response });
      dispatch({ type: GlobalActionTypes.DECREMENT_POST_LIKE, response });
    })
    .catch((error) => {
      dispatch(actions.reqFail(type, error))
    });
  }
}
