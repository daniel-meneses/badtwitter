import api from '../api/api';
import { Dispatch } from 'redux';
import { AppThunk } from '../store/types';
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
                dispatch({ type: FollowersActionTypes.APPEND_FOLLOWWERS, response})
                dispatch({ type: FollowersActionTypes.APPEND_ACCEPTED, response})
                dispatch({ type: UsersActionTypes.APPEND_USERS, response });
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
                dispatch({ type: FollowersActionTypes.APPEND_FOLLOWWERS, response})
                dispatch({ type: FollowersActionTypes.APPEND_PENDING, response})
                dispatch({ type: UsersActionTypes.APPEND_USERS, response });
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}

export function acceptFollowerRequest(data: any): AppThunk {
    let type = FollowersReqActionTypes.UPDATE_PENDING_FOLLOW_REQUEST
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type));
        api.post('/follower', data)
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: FollowersActionTypes.ACCEPT_FOLLOW, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}

export function rejectFollowerRequest(data: any): AppThunk {
    let type = FollowersReqActionTypes.UPDATE_PENDING_FOLLOW_REQUEST
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type));
        api.post('/follower', data)
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                dispatch({ type: FollowersActionTypes.REJECT_FOLLOW, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            });
    }
}
