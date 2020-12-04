import api from '../api/api';
import { Dispatch } from 'redux';
import * as actions from './common'
import { PostFormActionTypes, PostFormReqTypes } from '../reducers/ui'
import { LinkPreview } from '../types/common';

type Payload = {
  link_preview: LinkPreview | null;
  message: string;
}

export function postMessage(payload: Payload): AppThunk {
  let type = PostFormReqTypes.POST_NEW_POST
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type))
    api.post('/posts', payload)
      .then((response) => {
        dispatch({ type: PostFormActionTypes.HIDE_FLOATING_POST_FORM })
        dispatch(actions.reqSuccess(type))
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error))
      });
  }
}

export function getLinkPreview(linkURL: string): AppThunk {
  let type = PostFormReqTypes.GET_LINK_PREVIEW
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type))
    let base = 'http://api.linkpreview.net/?key=317510c11e6d6336d33793e4f8f1ed13&q=';
    return fetch(base + linkURL, { method: 'GET'})
    .then( response => {
      return response.json().then((data: any) => {
        if (!response.ok) {
          return Promise.reject(data)
        }
        return data
      })
    })
      .then((response) => {
        dispatch({ type: PostFormActionTypes.SET_LINK_PREVIEW, response })
        dispatch(actions.reqSuccess(type))
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error))
      });
  }
}