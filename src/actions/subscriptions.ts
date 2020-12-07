import api from '../api/api';
import { Dispatch } from 'redux';
import * as actions from './common';
import { SubscriptionReqActionTypes, SubscriptionActionTypes } from '../reducers/subscriptions';
import { GlobalActionTypes } from '../reducers/globalObjects';
import { SubscriptionResponse } from '../types/responseData';

export type subscriptionPayload = {
  user_id: number
  request_id?: number; 
}

type Response = {
  subscriptions: SubscriptionResponse[]
}

export function userFromSubscription(response: any) {
  return { users: response.subscriptions.map( (r: SubscriptionResponse) => {
    const { user, subject } = r;
    return [user, subject]
  }).flat() }
}

export function getPendingSubscriptionRequests(): AppThunk {
  let type = SubscriptionReqActionTypes.GET_ALL_PENDING_SUBSCRIPTIONS
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type));
    api.fetch('/subscriptions?accepted=false&subscriber=true')
      .then((response) => {
        dispatch(actions.reqSuccess(type));
        dispatch({ type: GlobalActionTypes.APPEND_USERS, response: userFromSubscription(response) });
        dispatch({ type: SubscriptionActionTypes.APPEND_PENDING_SUBSCRIPTIONS, response });
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error));
      });
  }
}

export function getAcceptedSubscriptionRequests(): AppThunk {
  let type = SubscriptionReqActionTypes.GET_ALL_ACCEPTED_SUBSCRIPTIONS
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type));
    api.fetch('/subscriptions?accepted=true&subscriber=true')
      .then((response) => {
        dispatch(actions.reqSuccess(type));
        dispatch({ type: GlobalActionTypes.APPEND_USERS, response: userFromSubscription(response) });
        dispatch({ type: SubscriptionActionTypes.APPEND_ACCEPTED_SUBSCRIPTIONS, response });
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error));
      });
  }
}

export function postSubscriptionRequest(data: subscriptionPayload): AppThunk {
  let type = SubscriptionReqActionTypes.POST_SUBSCRIPTION_REQUEST
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type));
    api.post('/subscriptions', data)
      .then((response) => {
        dispatch(actions.reqSuccess(type));
        const actionType = response.accepted 
          ? SubscriptionActionTypes.APPEND_ACCEPTED_SUBSCRIPTIONS
          : SubscriptionActionTypes.APPEND_PENDING_SUBSCRIPTIONS
        dispatch({ type: actionType, response });
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error));
      });
  }
}

export function deleteSubscription(data: subscriptionPayload): AppThunk {
  let type = SubscriptionReqActionTypes.DELETE_SUBSCRIPTION_REQUEST
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type));
    api.delete('/subscriptions/' + data.request_id, data)
    .then((response) => {
      dispatch(actions.reqSuccess(type));
       dispatch({ type: SubscriptionActionTypes.DELETE_SUBSCRIPTION, response })
    })
    .catch((error) => {
      dispatch(actions.reqFail(type, error));
    });
  }
}
