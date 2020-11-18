import api from '../api/api';
import { Dispatch } from 'redux';
import * as actions from './common';
import { FollowersActionTypes, FollowersReqActionTypes } from '../reducers/followers';
import { UsersActionTypes } from '../reducers/users';

export function getFollowers(): AppThunk {
    let type = FollowersReqActionTypes.GET_ACCEPTED_FOLLOWERS
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type));
        api.fetch('/follower', { accepted: true })
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: UsersActionTypes.APPEND_USERS, response });
                dispatch({ type: FollowersActionTypes.APPEND_FOLLOWWERS, response})
                dispatch({ type: FollowersActionTypes.APPEND_ACCEPTED, response})
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}

export function getPendingFollowRequests(): AppThunk {
    let type = FollowersReqActionTypes.GET_PENDING_FOLLOWERS
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type));
        api.fetch('/follower', { accepted: "false" })
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: UsersActionTypes.APPEND_USERS, response });
                dispatch({ type: FollowersActionTypes.APPEND_FOLLOWWERS, response})
                dispatch({ type: FollowersActionTypes.APPEND_PENDING, response})
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
    let type = FollowersReqActionTypes.UPDATE_PENDING_FOLLOW_REQUEST
    return (dispatch: Dispatch): any => {
        dispatch(actions.reqStart(type));
        api.post('/follower', payload)
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: FollowersActionTypes.ACCEPT_FOLLOW, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}

export function rejectFollowerRequest(payload: followRequestPayload): AppThunk {
    let type = FollowersReqActionTypes.UPDATE_PENDING_FOLLOW_REQUEST
    return (dispatch: Dispatch): any => {
        dispatch(actions.reqStart(type));
        api.post('/follower', payload)
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: FollowersActionTypes.REJECT_FOLLOW, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}
