import { combineReducers } from 'redux';
import { createReqReducer } from './common';

export enum SessionActionTypes {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER',
    SET_CURRENT_USER_NEW_AVATAR = 'SET_CURRENT_USER_NEW_AVATAR',
    SET_CURRENT_USER_NEW_INFO = 'SET_CURRENT_USER_NEW_INFO',
    LOG_USER_OUT = 'LOG_USER_OUT',
}

export enum SessionReqActionTypes {
    EMAIL_LOGIN = 'EMAIL_LOGIN',
    EMAIL_REGISTER = 'EMAIL_REGISTER',
};

const initialState = {
    isAuthenticated: false,
    currentUserId: null,
};

const session = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case SessionActionTypes.SET_CURRENT_USER:
            console.log(action.response);
            
            return {
                ...state,
                isAuthenticated: true,
                currentUserId: action.response.user.user_id,
            }
        case SessionActionTypes.SET_CURRENT_USER_NEW_AVATAR:
            let user2: any = Object.values(action.response)[0]
            let { avatar } = user2
            return {
                ...state
            }
        case SessionActionTypes.SET_CURRENT_USER_NEW_INFO:
            let user: any = Object.values(action.response)[0]
            let { first_name: firstName, last_name: lastName, bio } = user
            console.log(user);
            return {
                ...state
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