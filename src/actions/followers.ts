import api from '../api/api';
import { Dispatch } from 'redux';
import * as actions from './common';
import { GlobalActionTypes } from '../reducers/globalObjects';
import { SubscriptionActionTypes, SubscriptionReqActionTypes } from '../reducers/subscriptions';
import { SubscriptionResponse } from '../types/responseData';

export function userFromSubscription(response: any) {
    return { users: response.subscriptions.map( (r: SubscriptionResponse ) => {
      const { user, subject } = r;
      return [user, subject]
    }).flat() }
  }
  
export function getFollowers(): AppThunk {
    let type = SubscriptionReqActionTypes.GET_ALL_ACCEPTED_FOLLOWERS
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type));
        api.fetch('/subscriptions?accepted=true&subscriber=false')
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: GlobalActionTypes.APPEND_USERS, response: userFromSubscription(response) });
                dispatch({ type: SubscriptionActionTypes.APPEND_ACCEPTED_FOLLOWERS, response})
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}

export function getPendingFollowRequests(): AppThunk {
    let type = SubscriptionReqActionTypes.GET_ALL_PENDING_FOLLOWERS
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type));
        api.fetch('/subscriptions?accepted=false&subscriber=false')
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: GlobalActionTypes.APPEND_USERS, response: userFromSubscription(response) });
                dispatch({ type: SubscriptionActionTypes.APPEND_PENDING_FOLLOWERS, response})
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}

export type followRequestPayload = {
    accepted: boolean;
    id: number;
}

export function acceptFollowerRequest(payload: followRequestPayload): AppThunk {
    let type = SubscriptionReqActionTypes.UPDATE_FOLLOW_REQUEST
    let { id } = payload
    return (dispatch: Dispatch): any => {
        dispatch(actions.reqStart(type));
        api.patch(`/subscriptions/${id}`, payload)
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: SubscriptionActionTypes.UPDATE_FOLLOW, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}

export function rejectFollowerRequest(payload: followRequestPayload): AppThunk {
    let type = SubscriptionReqActionTypes.UPDATE_FOLLOW_REQUEST
    let { id } = payload
    return (dispatch: Dispatch): any => {
        dispatch(actions.reqStart(type));
        api.patch(`/subscriptions/${id}`, payload)
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: SubscriptionActionTypes.UPDATE_FOLLOW, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}
