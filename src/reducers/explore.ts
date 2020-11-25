import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { FetchRequest } from '../types/common';
import { createReqReducer } from './common';

export enum ExploreReqActionTypes {
    GET_EXPLORE_BY_TAG = 'GET_EXPLORE_BY_TAG',
    GET_TRENDING_TAGS = 'GET_TRENDING_TAGS',
}

export enum ExploreActionTypes {
    APPEND_EXPLORE_CONTENT = 'APPEND_EXPLORE_CONTENT',
    SET_TRENDING_TAGS = 'SET_TRENDING_TAGS',
}

type ExploreFeed = {
    [tagTitle: string] : {
        timeline: number[],
    }
}

export type Trending = {
    title: string,
    count: number,
}

type InitialState = {
    byTag: ExploreFeed;
    trending: Trending | [];
}

export const selectExplore = (state: RootState) => state.explore.explore.byTag;
export const selectFetchExploreByTagReq = (state: RootState): FetchRequest => state.explore.getExploreByTagReq

export const selectTrending = (state: RootState) => state.explore.explore.trending;

export const selectExploreByTag = createSelector(
    [selectExplore, (state: RootState, tag: string) => tag],
    (exploreByTag, tag) => exploreByTag[tag]
)


const explore = (state: InitialState = { byTag: {}, trending: [] }, action: any): any => {
    switch (action.type) {
        case ExploreActionTypes.APPEND_EXPLORE_CONTENT:
            let { byTag } = state;
            let { timeline, users } = action.response;
            let userId = Object.keys(users)[0];
            let profile = byTag[userId] || {};
            let feed = profile.timeline ? [...new Set([...profile.timeline, ...timeline])] : timeline;
            let userObj = { [action.tag]: { timeline: feed } };
            return {
                ...state,
                byTag: Object.assign({}, state.byTag, userObj)
            }
        case ExploreActionTypes.SET_TRENDING_TAGS:
            return {
                ...state,
                trending: action.response.trending
            }
        default: { }
            return state;
    }
}

const exploreReducer = combineReducers({
    explore,
    getExploreByTagReq: createReqReducer(ExploreReqActionTypes.GET_EXPLORE_BY_TAG),
    getTrendingTagsReq: createReqReducer(ExploreReqActionTypes.GET_TRENDING_TAGS),
})

export default exploreReducer;
