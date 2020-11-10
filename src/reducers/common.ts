
type Request = {
  isFetching: boolean,
  didSucceed: boolean,
  didFail: boolean,
  error: null | object
};

export type RequestState = object | Request;

type RequestActions = {
  type: string;
  error?: object;
}

export const createReqReducer = (actionType: string) =>
  (state: RequestState = {}, action: RequestActions) => {
    switch (action.type) {
      case `${actionType}_START`:
        return {
          isFetching: true,
          didSucceed: false,
          didFail: false,
        }
      case `${actionType}_SUCCESS`:
        return {
          ...state,
          isFetching: false,
          didSucceed: true,
          error: null,
        }
      case `${actionType}_FAIL`:        
        return {
          ...state,
          isFetching: false,
          didFail: true,
          didSucceed: false,
          error: action.error,
        }
      default:
        return state
    }
  }
