const initialState = {
  avatar: {
    url: "",
    isFetching: false,
    error: null
  },
  presigned_Url: {
    url: "",
    isFetching: false,
    error: null
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_PRESIGNED_URL":
      return {
        ...state,
       presigned_Url: {
         url: "",
         isFetching: true
        }
      };
    case "FETCH_PRESIGNED_URL_SUCCESS":
      return {
        ...state,
        presigned_Url: {
          url: action.response.url,
          isFetching: false
         }
      };
    case "FETCH_PRESIGNED_URL_FAILURE":
      return {
        ...state,
        presigned_Url: {
          url: "",
          isFetching: false,
          error: action.response.error
         }
      };
      case "UPLOAD_NEW_AVATAR":
        return {
          ...state,
         avatar: {
           url: "",
           isFetching: true,
           error: null
          }
        };
      case "UPLOAD_NEW_AVATAR_SUCCESS":
        return {
          ...state,
          avatar: {
            isFetching: false,
            error: null
          }
        };
      case "UPLOAD_NEW_AVATAR_FAILURE":
        return {
          ...state,
          avatar: {
            url: "",
            isFetching: false,
            error: action.response.error
           }
        };
    default:
      return state;
  }
}
