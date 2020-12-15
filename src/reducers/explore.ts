
import { combineReducers } from 'redux';
import { FetchRequest } from '../types/common';
import { createReqReducer } from './common';
import { Tag } from '../types/common';

export enum ExploreReqActionTypes {
    GET_TRENDING_TAGS = 'GET_TRENDING_TAGS',
    GET_NEWS_ARTICLES = 'GET_NEWS_ARTICLES',
}

export enum ExploreActionTypes {
    SET_TRENDING_TAGS = 'SET_TRENDING_TAGS',
    SET_NEWS_ARTICLES = 'SET_NEWS_ARTICLES',
}

type InitialState = {
    trending: Tag[] | [];
    news: any;
}

export const selectExploreArticles = (state: RootState) => state.explore.explore.news;
export const selectTrendingTags = (state: RootState) => state.explore.explore.trending;
export const selectFetchExploreByTagReq = (state: RootState): FetchRequest => state.explore.getTrendingTagsReq;
export const selectNewsFetchReq = (state: RootState): FetchRequest => state.explore.getNewsArticlesReq;
export const selectTrending = (state: RootState) => state.explore.explore.trending;


const explore = (state: InitialState = { trending: [], news: {} }, action: any): any => {
    switch (action.type) {
        case ExploreActionTypes.SET_TRENDING_TAGS:
            return {
                ...state,
                trending: action.response.tags,
            }
        case ExploreActionTypes.SET_NEWS_ARTICLES:
            return {
                ...state,
                news: Object.assign({}, state.news,  action.response.articles),
            }
        default: { }
            return state;
    }
}

const exploreReducer = combineReducers({
    explore,
    getTrendingTagsReq: createReqReducer(ExploreReqActionTypes.GET_TRENDING_TAGS),
    getNewsArticlesReq: createReqReducer(ExploreReqActionTypes.GET_NEWS_ARTICLES),
})

export default exploreReducer;

