import { Dispatch } from 'redux';
import { FeedActionTypes, FeedReqActionTypes } from '../reducers/feeds';
import { GlobalActionTypes } from '../reducers/globalObjects';
import * as actions from './common';
import api from '../api/api';

export function getGlobalFeed(nextCursor: string | null = null, headers = {}): AppThunk {
    let type = FeedReqActionTypes.GET_GLOBAL_FEED
    let url = `/posts?limit=40${nextCursor ? '&cursor=' + nextCursor : ''}`
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch(url, headers)
            .then((response) => {                
                dispatch(actions.reqSuccess(type))
                dispatch({ type: GlobalActionTypes.APPEND_USERS, response})
                dispatch({ type: GlobalActionTypes.APPEND_POSTS, response})
                dispatch({ type: FeedActionTypes.APPEND_GLOBAL_FEED, response });
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}

export function getHomeFeed(nextCursor: string | null = null, headers = {}): AppThunk {
    let type = FeedReqActionTypes.GET_HOME_FEED
    let url = `/subscriptions/posts?limit=40&subscriptions=true${nextCursor ? '&cursor=' + nextCursor : ''}`
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch(url, headers)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: GlobalActionTypes.APPEND_USERS, response})
                dispatch({ type: GlobalActionTypes.APPEND_POSTS, response})
                dispatch({ type: FeedActionTypes.APPEND_HOME_FEED, response });
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}