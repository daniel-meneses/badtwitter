const initialState = {
  profile: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_USER_PROFILE":
    console.log(action.response)
      return {
        ...state,
        profile: action.response,
      };
    default:
      return state;
  }
}
