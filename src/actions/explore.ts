import { Dispatch } from 'redux';
import { FeedActionTypes, FeedReqActionTypes } from '../reducers/feeds';
import * as actions from './common';
import api from '../api/api';
import { ExploreActionTypes, ExploreReqActionTypes } from '../reducers/explore';
import { GlobalActionTypes } from '../reducers/globalObjects';
import { IS_PRODUCTION } from '../constants/environment';


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

const url = IS_PRODUCTION ? 'https://still-shelf-30581.herokuapp.com/api/feed' : 'http://localhost:3000/api/feed';

export function getNewsArticles({page=1, limit=40 } = {}): AppThunk {
    let type = ExploreReqActionTypes.GET_NEWS_ARTICLES;
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetchFromUrl(`${url}/news?page=${page}&limit=${limit}`)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: ExploreActionTypes.SET_NEWS_ARTICLES, response})
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}

export function getNewsArticleById(id: number): AppThunk {
    let type = ExploreReqActionTypes.GET_NEWS_ARTICLES;
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetchFromUrl(`${url}/article/${id}`)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: ExploreActionTypes.SET_NEWS_ARTICLES, response})
            })
            .catch((error) => {
                dispatch(actions.reqFail(type, error))
            });
    }
}
