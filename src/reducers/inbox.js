import * as globals from '../constants/acts.js';

const initialState = {
    focusedTab: 'Messages'
};

export default function (state = initialState, action) {
  console.log(action)
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
