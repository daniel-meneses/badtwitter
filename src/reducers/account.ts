import { combineReducers, Reducer } from 'redux';
import { createReqReducer, RequestState } from './common';

export enum AccountActionTypes {
    SET_PRE_SIGNED_URL = 'SET_PRE_SIGNED_URL',
    CLEAR_PRESIGNED_URLS = 'CLEAR_PRESIGNED_URLS',
}

export enum AccountReqActionTypes {
    GET_PRE_SIGNED_URL = 'GET_PRE_SIGNED_URL',
    POST_TO_PRE_SIGNED_URL = 'POST_TO_PRE_SIGNED_URL',
    POST_ACCOUNT_AVATAR = 'POST_ACCOUNT_AVATAR',
    POST_ACCOUNT_INFO = 'POST_ACCOUNT_INFO'
}

export interface Accounts {
    account: Account,
    getPresignedURLReq: RequestState,
    postImageToPresignedURLReq: RequestState,
    postAccountAvatarReq: RequestState,
    postAccountInfoReq: RequestState,
}


type Account = {
    preSignedURL: null | string,
    preSignedImage: null | string,
}

const initial: Account = {
    preSignedURL: null,
    preSignedImage: null
}

type SET_PRE_SIGNED_URL = {
    type: AccountActionTypes.SET_PRE_SIGNED_URL,
    response: string,
}

type CLEAR_PRESIGNED_URLS = {
    type: AccountActionTypes.CLEAR_PRESIGNED_URLS,
}

type AccountActions = SET_PRE_SIGNED_URL | CLEAR_PRESIGNED_URLS

const account: Reducer<Account, AccountActions> = (state = initial, action) => {
    switch (action.type) {
        case AccountActionTypes.SET_PRE_SIGNED_URL:
            return {
                preSignedURL: action.response,
                preSignedImage: null
            }
        case AccountActionTypes.CLEAR_PRESIGNED_URLS:
            return {
                preSignedURL: null,
                preSignedImage: null
            }
        default:
            return state;
    }
}

const accountReducer = combineReducers({
    account,
    getPresignedURLReq: createReqReducer(AccountReqActionTypes.GET_PRE_SIGNED_URL),
    postImageToPresignedURLReq: createReqReducer(AccountReqActionTypes.POST_TO_PRE_SIGNED_URL),
    postAccountAvatarReq: createReqReducer(AccountReqActionTypes.POST_ACCOUNT_AVATAR),
    postAccountInfoReq: createReqReducer(AccountReqActionTypes.POST_ACCOUNT_INFO),
})

export default accountReducer;