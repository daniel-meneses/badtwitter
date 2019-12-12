const initialState = {
  profile: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_USER_PROFILE":
      return {
        ...state,
        profile: action.response,
      };
    default:
      return state;
  }
}
