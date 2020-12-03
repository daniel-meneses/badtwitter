import { combineReducers } from 'redux';

/*
    Controls data related to persisting UI state
    Example: focused inbox tab, home scroll posiiton
*/
export enum InboxActionTypes {
    SET_INBOX_TAB_FOCUS = 'SET_INBOX_TAB_FOCUS',
}

const inbox = (state = {focusedTab: 'messages'}, action: any) => {
    switch (action.type) {
        case InboxActionTypes.SET_INBOX_TAB_FOCUS:            
            return {
                ...state,
                focusedTab: action.tab,
            };
        default:
            return state;
    }
}

export enum PostFormActionTypes {
    DISPLAY_FLOATING_POST_FORM = 'DISPLAY_FLOATING_POST_FORM',
    HIDE_FLOATING_POST_FORM = 'HIDE_FLOATING_POST_FORM',
    SET_POST_FORM_TEXT = 'SET_POST_FORM_TEXT',
    SET_LINK_PREVIEW = 'SET_LINK_PREVIEW',
}

export enum PostFormReqTypes {
    POST_NEW_POST = 'POST_NEW_POST',
    GET_LINK_PREVIEW = 'GET_LINK_PREVIEW',
}

type postFormState = {
    shouldDisplayPostForm: boolean,
    postFormText: string,
}

const postFormState: postFormState = {
    shouldDisplayPostForm: false,
    postFormText: '',
}

const postForm = (state: any = {}, action: any) => {
    switch (action.type) {
        case PostFormActionTypes.DISPLAY_FLOATING_POST_FORM:
            return {
                ...state,
                shouldDisplayPostForm: true,
            };
        case PostFormActionTypes.HIDE_FLOATING_POST_FORM:
            return {
                ...state,
                shouldDisplayPostForm: false,
            };
        case PostFormActionTypes.SET_POST_FORM_TEXT:
            return {
                ...state,
                postFormText: action.text,
            };
        case PostFormActionTypes.SET_LINK_PREVIEW:
            return {
                ...state,
                linkPreview: action.response,
            };
        default:
            return state;
    }
}

export default combineReducers({
    inbox,
    postForm,
})