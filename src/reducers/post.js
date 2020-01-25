const initialState = {
  newPostSuccess: null
};

export default function (state = initialState, action) {
  switch (action.type) {
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
