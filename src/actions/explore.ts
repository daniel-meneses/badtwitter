import { Dispatch } from 'redux';
import { FeedActionTypes, FeedReqActionTypes } from '../reducers/feeds';
import * as actions from './common';
import api from '../api/api';
import { ExploreActionTypes, ExploreReqActionTypes } from '../reducers/explore';
import { GlobalActionTypes } from '../reducers/globalObjects';

export function getExploreContentWithTag(tag: string, cursor: string = ''): AppThunk {
    let type = FeedReqActionTypes.GET_TAG_FEED;
    let url = `/posts?limit=40&tag=${tag}${cursor ? '&cursor=' + cursor : ''}`
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch(url)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: GlobalActionTypes.APPEND_USERS, response})
                dispatch({ type: GlobalActionTypes.APPEND_POSTS, response})
                dispatch({ type: FeedActionTypes.APPEND_TAG_FEED, response, tag})
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}

export function getTrendingTags(): AppThunk {
    let type = ExploreReqActionTypes.GET_TRENDING_TAGS;
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch(`/tags?limit=100&length=4&group_by=title`)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: ExploreActionTypes.SET_TRENDING_TAGS, response})
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}