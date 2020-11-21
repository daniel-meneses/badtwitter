import { Dispatch } from 'redux';
import * as actions from './common'
import api from '../api/api';
import { SessionActionTypes, SessionReqActionTypes } from '../reducers/session'
import { UsersActionTypes } from '../reducers/users'

type EmailRegisterPayload = {
    user: {
        alias: string;
        avatar: string;
        bio: string;
        first_name: string;
        last_name: string;
        password: string;
        password_confirmation: string;
    }
}

type EmailLoginPayload = {
    email: string;
    password: string;
}

function setCurrentUser(dispatch: Dispatch, response: any) {
    dispatch({ type: SessionActionTypes.SET_CURRENT_USER, response });
    dispatch({ type: UsersActionTypes.APPEND_USERS, response });
}

export function login(data: EmailLoginPayload, redirectOnSuccess: any): AppThunk {
    let type: string = SessionReqActionTypes.EMAIL_LOGIN
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type));
        api.post('/accounts/session', data)
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                setCurrentUser(dispatch, response);
                redirectOnSuccess();
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            })
    }
}

export function signUp(data: any, redirectOnSuccess: any): AppThunk {
    let formattedData: EmailRegisterPayload = { user: data }
    let type: string = SessionReqActionTypes.EMAIL_REGISTER
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type));
        api.post('/accounts/user', formattedData)
            .then((response) => {
                dispatch(actions.reqSuccess(type));
                setCurrentUser(dispatch, response);
                redirectOnSuccess();
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error));
            })
    }
}

export function logout(history: any): AppThunk {
    return (dispatch: Dispatch) => {
        return api.delete('/accounts/session/delete', {})
            .then(() => {
                dispatch({ type: SessionActionTypes.LOG_USER_OUT });
                window.location.href = 'http://localhost:3000/home'
            })
    }
}
/*
    Express passes req.headers containing cookie
    through reqHeaders param.
*/
export function getSessionUser(reqHeaders = {}): AppThunk {
    return (dispatch: Dispatch) => {
        return api.fetch('/accounts/session', {}, reqHeaders)
            .then((response) => {
                setCurrentUser(dispatch, response)
                return true
            })
            .catch((error) => {
                dispatch({ type: "AUTHENTICATION_FAILURE", error })
                return false
            })
    }
}