import { combineReducers } from 'redux';
import { createReqReducer } from './common';
import { UserResponse } from '../types/responseData';

export enum SessionActionTypes {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    SET_PRE_SIGNED_URL = 'SET_PRE_SIGNED_URL',
    CLEAR_PRESIGNED_URLS = 'CLEAR_PRESIGNED_URLS',
    LOG_USER_OUT = 'LOG_USER_OUT',
}

export enum SessionReqActionTypes {
    GET_PRE_SIGNED_URL = 'GET_PRE_SIGNED_URL',
    POST_TO_PRE_SIGNED_URL = 'POST_TO_PRE_SIGNED_URL',
    EMAIL_LOGIN = 'EMAIL_LOGIN',
    EMAIL_REGISTER = 'EMAIL_REGISTER',
};

type InitialState = {
    isAuthenticated: boolean;
    currentUserId: number | null;
    preSignedURL: string | null,
    preSignedImage: string | null,
}

const initialState: InitialState = {
    isAuthenticated: false,
    currentUserId: null,
    preSignedURL: null,
    preSignedImage: null,
};

type SessionActionType1 = {
    type: SessionActionTypes.CLEAR_PRESIGNED_URLS;
}

type SessionActionType2 = {
    type: SessionActionTypes.LOG_USER_OUT;
}

type SetCurrentUserActionType = {
    type: SessionActionTypes.SET_CURRENT_USER;
    response: UserResponse;
}

type SetPresignedActionType = {
    type: SessionActionTypes.SET_PRE_SIGNED_URL;
    response: { url: string };
}

type ActionTypes = SetCurrentUserActionType | SetPresignedActionType | SessionActionType1 | SessionActionType2;

export const selectIsAuthenticated = (state: RootState): boolean => state.session.session.isAuthenticated;
export const selectCurrenUserId = (state: RootState): number | null => state.session.session.currentUserId;

const session = (state: any = initialState, action: ActionTypes): any => {
    switch (action.type) {
        case SessionActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                currentUserId: action.response.id,
            }
        case SessionActionTypes.SET_PRE_SIGNED_URL:
            return {
                preSignedURL: action.response.url,
                preSignedImage: null
            }
        case SessionActionTypes.CLEAR_PRESIGNED_URLS:
            return {
                ...state,
                preSignedURL: null,
                preSignedImage: null
            }
        case SessionActionTypes.LOG_USER_OUT:
            return {
                ...state,
                isAuthenticated: false,
                currentUserId: null,
            }
        default:
            return state;
    }
}


const sessionReducer = combineReducers({
    session,
    postLoginReq: createReqReducer(SessionReqActionTypes.EMAIL_LOGIN),
    postRegisterReq: createReqReducer(SessionReqActionTypes.EMAIL_REGISTER),
})

export default sessionReducer;