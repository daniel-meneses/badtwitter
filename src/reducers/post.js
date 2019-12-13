const initialState = {
  hasBeenLiked: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_HAS_BEEN_LIKED":
      return {
        ...state,
        hasBeenLiked: action.response,
      };
    default:
      return state;
  }
}
