import api from '../api/api';
import { Dispatch } from 'redux';
import * as actions from './common';
import { SubscriptionReqActionTypes, SubscriptionActionTypes } from '../reducers/subscriptions';
import { UsersActionTypes } from '../reducers/users';

export type subscriptionPayload = {
  user_id: number
}

export function getPendingSubscriptionRequests(): AppThunk {
  let type = SubscriptionReqActionTypes.GET_ALL_PENDING_SUBSCRIPTIONS
  return (dispatch: Dispatch) => {
    dispatch(actions.reqStart(type));
    api.fetch('/subscription?accepted=false')
      .then((response) => {
        dispatch(actions.reqSuccess(type));
        dispatch({ type: UsersActionTypes.APPEND_USERS, response });
        dispatch({ type: SubscriptionActionTypes.APPEND_SUBSCRIPTIONS, response });
        dispatch({ type: SubscriptionActionTypes.APPEND_PENDING_REQUEST_IDS, response });
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
    api.fetch('/subscription?accepted=true')
      .then((response) => {
        dispatch(actions.reqSuccess(type));
        dispatch({ type: UsersActionTypes.APPEND_USERS, response });
        dispatch({ type: SubscriptionActionTypes.APPEND_SUBSCRIPTIONS, response });
        dispatch({ type: SubscriptionActionTypes.APPEND_ACCEPTED_REQUEST_IDS, response });
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
    api.post('/subscription', { user_id: data })
      .then((response) => {
        dispatch(actions.reqSuccess(type));
        dispatch({ type: SubscriptionActionTypes.APPEND_SUBSCRIPTIONS, response });
        dispatch({ type: SubscriptionActionTypes.APPEND_PENDING_REQUEST_IDS, response });
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
    api.delete('/subscription/delete', data)
    .then((response) => {
      dispatch(actions.reqSuccess(type));
       dispatch({ type: SubscriptionActionTypes.REMOVE_SUBSCRIPTION, response })
    })
    .catch((error) => {
      dispatch(actions.reqFail(type, error));
    });
  }
}
