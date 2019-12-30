import * as feed from '../constants/feed.js';

const initialState = {
  global_feed: [],
  user_feed: [],
  global: { list: [],
            dataMap: {},
            isFetching: false,
            errors: null
          },
  profile: { list: [],
            dataMap: {},
            isFetching: false,
            errors: null
          },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case feed.SET_GLOBAL_FEED:
      return {
        ...state,
        global_feed: action.response.data,
      };
    case feed.SET_USER_FEED:
      return {
        ...state,
        user_feed: action.response.data,
      };
    case "GET_GLOBAL_FEED":
      return {
        ...state,
        global: { isFetching: true,
                  errors: null
                },
      };
    case "GET_GLOBAL_FEED_SUCCESS":
      return {
        ...state,
        global: { list: action.response.list,
                  dataMap: action.response.data_map,
                  isFetching: false,
                  errors: null
                  },
      };
    case "GET_GLOBAL_FEED_FAIL":
      return {
        ...state,
        global: { isFetching: false,
                  errors: "Failed to get global feed"
                },
      };
    case "GET_PROFILE_FEED":
      return {
        ...state,
        profile: { isFetching: true,
                   errors: null
                 },
      }
    case "GET_PROFILE_FEED_SUCCESS":
      return {
        ...state,
        profile: { list: action.response.list,
                   dataMap: action.response.data_map,
                   isFetching: false,
                   errors: null
                  },
      }
    case "GET_PROFILE_FEED_FAIL":
      return {
        ...state,
        profile: { isFetching: false,
                   errors: "Failed to get profile feed"
                  },
      }
    default:
      return state;
  }
}
