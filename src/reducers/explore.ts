
import { combineReducers } from 'redux';
import { FetchRequest } from '../types/common';
import { createReqReducer } from './common';
import { Tag } from '../types/common';

export enum ExploreReqActionTypes {
    GET_TRENDING_TAGS = 'GET_TRENDING_TAGS',
}

export enum ExploreActionTypes {
    SET_TRENDING_TAGS = 'SET_TRENDING_TAGS',
}

type InitialState = {
    trending: Tag[] | [];
}

export const selectTrendingTags = (state: RootState) => state.explore.explore.trending;
export const selectFetchExploreByTagReq = (state: RootState): FetchRequest => state.explore.getTrendingTagsReq

export const selectTrending = (state: RootState) => state.explore.explore.trending;


const explore = (state: InitialState = { trending: [] }, action: any): any => {
    switch (action.type) {
        case ExploreActionTypes.SET_TRENDING_TAGS:
            return {
                ...state,
                trending: action.response.tags
            }
        default: { }
            return state;
    }
}

const exploreReducer = combineReducers({
    explore,
    getTrendingTagsReq: createReqReducer(ExploreReqActionTypes.GET_TRENDING_TAGS),
})

export default exploreReducer;
