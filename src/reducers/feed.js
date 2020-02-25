import * as feed from '../constants/acts.js';

const initialState = {
  global: { timeline: [],
            isFetching: false,
            errors: null
  },
  profile: { timeline: [],
            isFetching: false,
            errors: null
  },
  profiles: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case feed.GET_GLOBAL_FEED:
      return {
        ...state,
        global: { ...state.global,
                  isFetching: true,
                  errors: null
                },
      };
    case feed.GET_GLOBAL_FEED_SUCCESS:
      return {
        ...state,
        global: { timeline: action.response.timeline,
                  isFetching: false,
                  errors: null
                  },
      };
    case feed.GET_GLOBAL_FEED_FAIL:
      return {
        ...state,
        global: { ...state.global,
                  isFetching: false,
                  errors: "Failed to get global feed"
                },
      };
    case feed.GET_PROFILE_FEED:
    var profile = { isFetching: true,
                    errors: null }
      return {
        ...state,
        profiles: { ...state.profiles, [action.userId] : profile },
      }
    case feed.GET_PROFILE_FEED_SUCCESS:
    var profile = { timeline: action.response.timeline,
                    isFetching: false,
                    errors: null
                  }
      return {
        ...state,
        profiles: { ...state.profiles, [Object.keys(action.response.users)] : profile },
      }
    case feed.GET_PROFILE_FEED_FAIL:
    var profile = { isFetching: false,
                    errors: action.response.error
                  }
      return {
        ...state,
        profiles: { ...state.profiles, [action.userId] : profile },
      }
    case feed.APPEND_NEW_POST_TO_GLOBAL_FEED:
      return {
        ...state,
        global: {
          ...state.global,
          timeline : [Object.keys(action.response).map(Number)[0], ...state.global.timeline]
        },
      }
    default:
      return state;
  }
}
