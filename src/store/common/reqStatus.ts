type Status23 = {
  isFetching: boolean,
  didSucceed: boolean,
  response: null | object,
  didFail: boolean,
  error: null | object
}


export const requestStatus: Status23 = {
  isFetching: false,
  didSucceed: false,
  response: null,
  didFail: false,
  error: null
}


export const createReqStatusReducer = (actionType: string) =>
  (state = requestStatus, action: any) => {
    switch (action.type) {
      case `${actionType}`:
        return {
          isFetching: true,
          didSucceed: false,
          response: null,
          didFail: false,
          error: action.error
        }
      case `${actionType}_SUCCESS`:
        return {
          ...state,
          isFetching: false,
          didSucceed: true,
          response: action.response
        }
      case `${actionType}_FAIL`:
        return {
          ...state,
          isFetching: false,
          didFail: true,
          error: action.error
        }
      default:
        return state
    }
  }
