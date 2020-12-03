import { Dispatch } from 'redux';
import { AccountReqActionTypes } from '../reducers/account'
import * as actions from './common'
import api from '../api/api';
import { SessionActionTypes, SessionReqActionTypes } from '../reducers/session';
import { GlobalActionTypes } from '../reducers/globalObjects';

type AvatarPayload = {
    avatar: string
}

export type AccountInfoPayload = {
    first_name: string;
    last_name: string;
    bio: string;
}

export function getPresignedUrl(): AppThunk {
    let type: string = SessionReqActionTypes.GET_PRE_SIGNED_URL
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        api.fetch('/accounts/presigned')
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: SessionActionTypes.SET_PRE_SIGNED_URL, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}

export function postImageToPresignedURL(url: string, data: string): AppThunk {
    let type: string = SessionReqActionTypes.POST_TO_PRE_SIGNED_URL
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.postImage(url, data)
            .then(() => {
                dispatch(actions.reqSuccess(type))
                let profileImage: AvatarPayload = { avatar: url.split("?")[0] }
                return uploadNewAvatarImage(profileImage, dispatch)
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}

function uploadNewAvatarImage(profileImage: AvatarPayload, dispatch: Dispatch): void {
    let type: string = AccountReqActionTypes.POST_ACCOUNT_AVATAR
    dispatch(actions.reqStart(type))
    api.patch('/accounts/user', profileImage)
        .then((response) => {
            dispatch(actions.reqSuccess(type))
            dispatch({ type: SessionActionTypes.CLEAR_PRESIGNED_URLS });
            dispatch({ type: GlobalActionTypes.APPEND_USERS, response })
        })
        .catch((error) => {
            dispatch(actions.reqFail(type, error))
        })
}


export function editAccountInfo(data: AccountInfoPayload): AppThunk {
    let type: string = AccountReqActionTypes.POST_ACCOUNT_INFO
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        api.patch('/accounts/user', data)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: GlobalActionTypes.APPEND_USERS, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}
