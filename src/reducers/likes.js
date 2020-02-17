import * as like from '../constants/acts.js';

const initialState = {
  likedPostIds: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case like.LIKE_POST_SUCCESS:
      return {
        ...state,
        likedPostIds: [...state.likedPostIds, action.response.post_id],
      };
    case like.UNLIKE_POST_SUCCESS:
      return {
        ...state,
        likedPostIds: state.likedPostIds.filter(hasBeenLiked => hasBeenLiked !== action.response.post_id)
      };
    case like.GET_LIKED_POSTS_SUCCESS:
      return {
        ...state,
        likedPostIds: action.response,
      };
    default:
      return state;
  }
}
