const initialState = {
  newPostSuccess: null,
  floatingPostFormIsHidden: true,
  shouldClearForm: false
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
    case "DISPLAY_FLOATING_POST_FORM":
      return {
        ...state,
       floatingPostFormIsHidden: false,
    };
    case "HIDE_FLOATING_POST_FORM":
      return {
        ...state,
       floatingPostFormIsHidden: true,
      };
    case "CLEAR_FORM":
      return {
        ...state,
       shouldClearForm: true,
      };
    case "RESET_CLEAR_FORM":
      return {
        ...state,
       shouldClearForm: false,
      };
    default:
      return state;
  }
}
