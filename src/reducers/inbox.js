const initialState = {
    focusedTab: 'Messages'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_INBOX_TAB_FOCUS':
      return {
        ...state,
        focusedTab: action.tab
      };
    default:
      return state;
  }
}
