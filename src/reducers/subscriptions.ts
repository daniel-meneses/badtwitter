import { combineReducers } from 'redux';
import { createReqReducer } from './common'

export enum SubscriptionReqActionTypes {
  GET_ALL_PENDING_SUBSCRIPTIONS = 'GET_ALL_PENDING_SUBSCRIPTIONS',
  GET_ALL_ACCEPTED_SUBSCRIPTIONS = 'GET_ALL_ACCEPTED_SUBSCRIPTIONS',
  POST_SUBSCRIPTION_REQUEST = 'POST_SUBSCRIPTION_REQUEST',
  DELETE_SUBSCRIPTION_REQUEST = 'DELETE_SUBSCRIPTION_REQUEST',
}

export enum SubscriptionActionTypes {
  APPEND_SUBSCRIPTIONS = 'APPEND_SUBSCRIPTIONS',
  APPEND_PENDING_REQUEST_IDS = 'APPEND_PENDING_REQUEST_IDS',
  APPEND_ACCEPTED_REQUEST_IDS = 'APPEND_ACCEPTED_REQUEST_IDS',
  REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION',
}

interface SubscriptionRequest {
  id: number,
  subjectId: number
}

type initialState = {
  byId: object | {
    [reqId: string]: SubscriptionRequest | object
  },
  pendingReqIds: number[],
  acceptedReqIds: number[],
  pendingUserIds: number[],
  acceptedUserIds: number[]
};

const initialState: initialState = {
  byId: {},
  pendingReqIds: [],
  acceptedReqIds: [],
  pendingUserIds: [],
  acceptedUserIds: []
}

/*
    TODO - Clear 'any' types
*/

const subscriptions = (state = initialState, action: any) => {
  switch (action.type) {
    case SubscriptionActionTypes.APPEND_SUBSCRIPTIONS: 
      var { subscriptions } = action.response
      return {
        ...state,
        byId: Object.assign({}, state.byId, subscriptions)
      };
    case SubscriptionActionTypes.APPEND_PENDING_REQUEST_IDS:
      console.log(action);
      var { subscriptions } = action.response
      var subs: any = Object.values(subscriptions || {})
      var userIds = subs.map((sub: any) => sub.subject_id);
      var subIds = subs.map((sub: any) => sub.id);
      return {
        ...state,
        pendingReqIds: [...new Set([...state.pendingReqIds, ...subIds])],
        pendingUserIds: [...new Set([...state.acceptedUserIds, ...userIds])],
      };
    case SubscriptionActionTypes.APPEND_ACCEPTED_REQUEST_IDS:
      var { subscriptions } = action.response
      var subs: any = Object.values(subscriptions || {})
      var userIds = subs.map((sub: any) => sub.subject_id);
      var subIds = subs.map((sub: any) => sub.id);
      return {
        ...state,
        acceptedReqIds: [...new Set([...state.acceptedReqIds, ...subIds])],
        acceptedUserIds: [...new Set([...state.acceptedUserIds, ...userIds])],
      };
    case SubscriptionActionTypes.REMOVE_SUBSCRIPTION:
      var { subscriptions } = action.response;
      var sub: any = Object.values(subscriptions || {});
      var userId = sub[0].subject_id;
      var subId: any = sub[0].id;
      console.log(sub);
      console.log(userId);
      console.log(subId);
      
      
      console.log(state.acceptedReqIds.filter(id => id !== subId ));
      console.log(state.acceptedUserIds.filter(id => id !== userId ));
      
      return {
        ...state,
        acceptedReqIds: state.acceptedReqIds.filter(id => id !== subId ),
        acceptedUserIds: state.acceptedUserIds.filter(id => id !== userId ),
      };
    default:
      return state;
  }
}

const subscriptionsReducer = combineReducers({
    subscriptions,
    getAcceptedSubscriptions: createReqReducer(SubscriptionReqActionTypes.GET_ALL_ACCEPTED_SUBSCRIPTIONS),
    getPendingSubscriptions: createReqReducer(SubscriptionReqActionTypes.GET_ALL_PENDING_SUBSCRIPTIONS),
  })
  
export default subscriptionsReducer;