const initialState = {
  hasBeenLiked: [],
  newPostSuccess: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LIKE_POST_SUCCESS":
      return {
        ...state,
        hasBeenLiked: [...state.hasBeenLiked, action.response.post_id],
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        hasBeenLiked: state.hasBeenLiked.filter(hasBeenLiked => hasBeenLiked !== action.response.post_id)
      };
    case "UPDATE_HAS_BEEN_LIKED":
      return {
        ...state,
        hasBeenLiked: action.response,
      };
    case "NEW_POST_SUCCESS":
      return {
        ...state,
       newPostSuccess: true,
      };
    case "NEW_POST_FAILURE":
      return {
        ...state,
       newPostSuccess: false,
      };
    default:
      return state;
  }
}
