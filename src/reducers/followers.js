import * as act from '../constants/subscription.js';

const initialState = {
    list:[],
    dataMap: {},
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case act.GET_NEW_FOLLOWERS:
      return {
        ...state,
        isFetching: true,
      };
    case act.GET_NEW_FOLLOWERS_SUCCESS:
      return {
        ...state,
        list: action.response.list,
        dataMap: action.response.data_map,
        isFetching: false,
        error: null,
      };
    case act.GET_NEW_FOLLOWERS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: "Failed to get followers",
        };
    default:
      return state;
  }
}
