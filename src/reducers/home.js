const initialState = {
    scrollPosition: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_HOME_SCROLL_POSITION':
      return {
        scrollPosition: action.position
      };
    default:
      return state;
  }
}
