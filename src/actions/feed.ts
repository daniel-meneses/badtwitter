import { Dispatch } from 'redux';
import { FeedActionTypes, FeedReqActionTypes } from '../reducers/feed';
import { UsersActionTypes } from '../reducers/users';
import { PostActionTypes } from '../reducers/posts';
import * as actions from './common';
import api from '../api/api';

export function getGlobalFeed(nextCursor: string | null = null, headers = {}): AppThunk {
    let type = FeedReqActionTypes.GET_GLOBAL_FEED
    let data = nextCursor ? { afterCursor: nextCursor } : {}
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch('/feed/global', data, headers)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: UsersActionTypes.APPEND_USERS, response})
                dispatch({ type: PostActionTypes.APPEND_POSTS, response})
                dispatch({ type: FeedActionTypes.APPEND_GLOBAL_FEED, response });
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}