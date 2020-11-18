import { Dispatch } from 'redux';
import { UsersActionTypes } from '../reducers/users'
import { AccountActionTypes, AccountReqActionTypes } from '../reducers/account'
import * as actions from './common'
import api from '../api/api';

type AvatarPayload = {
    image: string
}

export type AccountInfoPayload = {
    first_name: string;
    last_name: string;
    bio: string;
}

export function getPresignedUrl(): AppThunk {
    let type: string = AccountReqActionTypes.GET_PRE_SIGNED_URL
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        api.fetch('/accounts/user/avatar/presigned')
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: AccountActionTypes.SET_PRE_SIGNED_URL, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}

export function postImageToPresignedURL(url: string, data: string): AppThunk {
    let type: string = AccountReqActionTypes.POST_TO_PRE_SIGNED_URL
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.postImage(url, data)
            .then(() => {
                dispatch(actions.reqSuccess(type))
                let profileImage: AvatarPayload = { image: url.split("?")[0] }
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
    api.post('/accounts/user/avatar', profileImage)
        .then((response) => {
            dispatch(actions.reqSuccess(type))
            dispatch({ type: AccountActionTypes.CLEAR_PRESIGNED_URLS });
            dispatch({ type: UsersActionTypes.APPEND_USERS, response })
        })
        .catch((error) => {
            dispatch(actions.reqFail(type, error))
        })
}


export function editAccountInfo(data: AccountInfoPayload): AppThunk {
    let type: string = AccountReqActionTypes.POST_ACCOUNT_INFO
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        api.post('/accounts/user/update', data)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: UsersActionTypes.APPEND_USERS, response })
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}
