import api from '../api/api';
import { Dispatch } from 'redux';
import { AppThunk } from '../store/types';
import * as actions from './common';
import { SubscriptionReqActionTypes, SubscriptionActionTypes } from '../reducers/subscriptions';
import { UsersActionTypes } from '../reducers/users';

interface SubscriptionRequest {
  id: number,
    subjectId: number
}

export function getPendingSubscriptionRequests(): AppThunk {
  let type = SubscriptionReqActionTypes.GET_ALL_PENDING_SUBSCRIPTIONS
  console.log('Action hit');
  return (dispatch: Dispatch) => {
    console.log('Dispatch hit');
    dispatch(actions.reqStart(type));
    api.fetch('/subscription?accepted=false')
      .then((response) => {
        dispatch(actions.reqSuccess(type));
        dispatch({ type: SubscriptionActionTypes.APPEND_SUBSCRIPTIONS, response });
        dispatch({ type: SubscriptionActionTypes.APPEND_PENDING_REQUEST_IDS, response });
        dispatch({ type: UsersActionTypes.APPEND_USERS, response });
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
        dispatch({ type: SubscriptionActionTypes.APPEND_SUBSCRIPTIONS, response });
        dispatch({ type: SubscriptionActionTypes.APPEND_ACCEPTED_REQUEST_IDS, response });
        dispatch({ type: UsersActionTypes.APPEND_USERS, response });
      })
      .catch((error) => {
        dispatch(actions.reqFail(type, error));
      });
  }
}

export function postSubscriptionRequest(data: any): AppThunk {
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

export function deleteSubscription(data: any): AppThunk {
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
