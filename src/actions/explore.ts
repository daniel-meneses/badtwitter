import { Dispatch } from 'redux';
import { FeedActionTypes, FeedReqActionTypes } from '../reducers/feed';
import { UsersActionTypes } from '../reducers/users';
import { PostActionTypes } from '../reducers/posts';
import * as actions from './common';
import api from '../api/api';
import { ExploreActionTypes, ExploreReqActionTypes } from '../reducers/explore';

export function getExploreContentWithTag(tag: string): AppThunk {
    let type = ExploreReqActionTypes.GET_EXPLORE_BY_TAG;
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch(`/explore/tag/${tag}`)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: UsersActionTypes.APPEND_USERS, response})
                dispatch({ type: PostActionTypes.APPEND_POSTS, response})
                dispatch({ type: ExploreActionTypes.APPEND_EXPLORE_CONTENT, response, tag})
            })
            .catch((error) => {
                console.log(error)
                dispatch(actions.reqFail(type, error))
            });
    }
}

export function getTrendingTags(): AppThunk {
    let type = ExploreReqActionTypes.GET_TRENDING_TAGS;
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch(`/trending/tags`)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: ExploreActionTypes.SET_TRENDING_TAGS, response})
            })
            .catch((error) => {
                console.log(error)
                dispatch(actions.reqFail(type, error))
            });
    }
}