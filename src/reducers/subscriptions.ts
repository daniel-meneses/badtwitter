import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { Subscription } from '../types/common';
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

type SubscriptionResponse = {
  id: number;
  subject_id: number;
  inserted_at: string;
  updated_at: string;
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

function formatSubscriptionResponse(subscriptions: {[id: string]: SubscriptionResponse}) {
  let subscriptionsState: {[id: string] : Subscription} = {}
  Object.values(subscriptions).forEach( (sub: SubscriptionResponse) => {
    subscriptionsState[`${sub.id}`] = formatSubscription(sub);
  })
  return subscriptionsState
}

function formatSubscription(sub: SubscriptionResponse): Subscription {
  const { id, subject_id: subjectId, inserted_at: insertedAt, updated_at: updatedAt } = sub
  return ({
    id, subjectId, insertedAt, updatedAt
  })
}

export const selectSubscriptions = (state: RootState): any => state.subscriptions.subscriptions.byId;
export const selectPendingSubscriptionIds = (state: RootState) => state.subscriptions.subscriptions.pendingReqIds;
export const selectPendingSubscriptionUsers = (state: RootState) => state.subscriptions.subscriptions.pendingUserIds;
export const selectAcceptedSubscriptionIds = (state: RootState) => state.subscriptions.subscriptions.acceptedReqIds;
export const selectAcceptedSubscriptionUsers = (state: RootState) => state.subscriptions.subscriptions.acceptedUserIds;

export const selectAcceptedSubscriptionRequests: any = createSelector(
  [selectSubscriptions, selectAcceptedSubscriptionIds],
  (subscriptions: { [id: string] : Subscription}, acceptedSubscriptionIds: number[]) => {
    return acceptedSubscriptionIds.reduce((o, id) => ({ ...o, [id]: subscriptions[id]}), {})
   }
)


export const selectPendingSubscriptionRequests = createSelector(
  [selectSubscriptions, selectPendingSubscriptionIds],
  (subscriptions: { [id: string] : Subscription}, pendingSubscriptionIds: number[]) => {
    return [...pendingSubscriptionIds].map(id => subscriptions[id]);
   }
)

const subscriptions = (state = initialState, action: any) => {
  switch (action.type) {
    case SubscriptionActionTypes.APPEND_SUBSCRIPTIONS:
      var { subscriptions } = action.response;
      var formattedSubscriptions = formatSubscriptionResponse(subscriptions);
      return {
        ...state,
        byId: Object.assign({}, state.byId, formattedSubscriptions),
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
      return {
        ...state,
        acceptedReqIds: state.acceptedReqIds.filter(id => id !== subId),
        acceptedUserIds: state.acceptedUserIds.filter(id => id !== userId),
      };
    default:
      return state;
  }
}

export const subscriptionsReducer = combineReducers({
  subscriptions,
  getAcceptedSubscriptions: createReqReducer(SubscriptionReqActionTypes.GET_ALL_ACCEPTED_SUBSCRIPTIONS),
  getPendingSubscriptions: createReqReducer(SubscriptionReqActionTypes.GET_ALL_PENDING_SUBSCRIPTIONS),
})

export default subscriptionsReducer;