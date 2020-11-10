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

export enum SrollPositionActionTypes {
    SET_HOME_SCROLL_POSITION = 'SET_HOME_SCROLL_POSITION',
}

const scrollPosition = (state = {home: 0}, action: any) => {
    switch (action.type) {
        case SrollPositionActionTypes.SET_HOME_SCROLL_POSITION:
            return {
                ...state,
                home: action.position,
            };
        default:
            return state;
    }
}


export enum PostFormActionTypes {
    DISPLAY_FLOATING_POST_FORM = 'DISPLAY_FLOATING_POST_FORM',
    HIDE_FLOATING_POST_FORM = 'HIDE_FLOATING_POST_FORM',
    SET_POST_FORM_TEXT = 'SET_POST_FORM_TEXT',
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
            console.log(action);
            
            return {
                ...state,
                postFormText: action.text,
            };
        default:
            return state;
    }
}

export default combineReducers({
    scrollPosition,
    inbox,
    postForm,
})