import api from '../api/api';
import { Dispatch } from 'redux';
import * as actions from './common'
import { AppThunk } from '../store/types'
import { PostActionTypes, PostReqActionTyoes } from '../reducers/posts'
import { FeedActionTypes } from '../reducers/feed'
import { PostFormActionTypes } from '../reducers/ui'

export function postMessage(message: string): AppThunk {
  let type = PostReqActionTyoes.POST_NEW_POST
  var data = { message: message }
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type))
    api.post('/post', data)
      .then((response) => {
        dispatch({ type: PostFormActionTypes.HIDE_FLOATING_POST_FORM })
        dispatch({ type: PostActionTypes.APPEND_NEW_USER_POST, response });
        dispatch({ type: FeedActionTypes.APPEND_FEED_NEW_USER_POST, response });
        dispatch(actions.reqSuccess(type))
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error))
      });
  }
}
