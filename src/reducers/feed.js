import * as feed from '../constants/feed.js';
import * as sharedAction from '../constants/sharedAction.js';


const initialState = {
  global: { timeline: [],
            isFetching: false,
            errors: null
          },
  profile: { timeline: [],
            isFetching: false,
            errors: null
          },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case feed.GET_GLOBAL_FEED:
      return {
        ...state,
        global: { isFetching: true,
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
        global: { isFetching: false,
                  errors: "Failed to get global feed"
                },
      };
    case feed.GET_PROFILE_FEED:
      return {
        ...state,
        profile: { isFetching: true,
                   errors: null
                 },
      }
    case feed.GET_PROFILE_FEED_SUCCESS:
      return {
        ...state,
        profile: { timeline: action.response.timeline,
                   isFetching: false,
                   errors: null
                  },
      }
    case feed.GET_PROFILE_FEED_FAIL:
      return {
        ...state,
        profile: { isFetching: false,
                   errors: "Failed to get profile feed"
                  },
      }
    case sharedAction.APPEND_NEW_POST_TO_GLOBAL_FEED:
      return {
        ...state,
      profile: {
          timeline : [Object.keys(action.response).map(Number)[0], ...state.profile.timeline ]
        },
        global: {
          timeline : [Object.keys(action.response).map(Number)[0], ...state.global.timeline ]
        },
      }
    default:
      return state;
  }
}
