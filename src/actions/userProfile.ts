import { Dispatch } from 'redux';
import * as actions from './common'
import api from '../api/api';
import { GlobalActionTypes } from '../reducers/globalObjects';
import { FeedActionTypes, FeedReqActionTypes } from '../reducers/feeds';


export function getUserProfile(userId: number, headers = {}): AppThunk {
    let type = FeedReqActionTypes.GET_USER_PROFILE_FEED
    let url = `/posts?user_id=${userId}&limit=40${false ? '&cursor=' + 'cursor' : ''}`
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch(url, {}, headers)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: GlobalActionTypes.APPEND_USERS, response})
                dispatch({ type: GlobalActionTypes.APPEND_POSTS, response})
                dispatch({ type: FeedActionTypes.APPEND_USER_PROFILE_FEED, response, userId });
            })
            .catch((error) => {                
                dispatch(actions.reqFail(type, error))
            });
    }
}