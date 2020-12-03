import { act } from '@testing-library/react';
import { combineReducers } from 'redux';
import { createReqReducer } from './common'

export interface ILikes {
  postIds: number[];
}

const initial: ILikes = {
  postIds: [],
}

export enum LikeActionTypes {
  SET_ALL_LIKES = 'SET_ALL_LIKES',
  APPEND_LIKE = 'APPEND_LIKE',
  REMOVE_LIKE = 'REMOVE_LIKE',
}


export enum LikeReqActionTypes {
  POST_LIKE = 'POST_LIKE',
  GET_ALL_LIKES = 'GET_ALL_LIKES',
  DELETE_LIKE = 'DELETE_LIKE',
}

export const selectLikedPosts = (state: RootState): number[] => state.likes.likes.postIds

const likes = (state: ILikes = initial, action: any) => {
  switch (action.type) {
    case LikeActionTypes.SET_ALL_LIKES:
      return { postIds: action.response.post_ids }
    case LikeActionTypes.APPEND_LIKE:
      return { postIds : [...state.postIds, action.response.post_id] }
    case LikeActionTypes.REMOVE_LIKE:
      return { postIds : state.postIds.filter((id: number) => id !== action.response.post_id) }
    default:
      return state;
  }
}

const likesReducer = combineReducers({
  likes,
  getAllLikesReq: createReqReducer(LikeReqActionTypes.GET_ALL_LIKES),
  postLikeReq: createReqReducer(LikeReqActionTypes.POST_LIKE),
  deleteLikeReq: createReqReducer(LikeReqActionTypes.DELETE_LIKE),
})

export default likesReducer;
