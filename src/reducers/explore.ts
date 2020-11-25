import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { FetchRequest } from '../types/common';
import { createReqReducer  } from './common';

export enum ExploreReqActionTypes {
    GET_EXPLORE_BY_TAG = 'GET_EXPLORE_BY_TAG',
}

export enum ExploreActionTypes {
    APPEND_EXPLORE_CONTENT = 'APPEND_EXPLORE_CONTENT',
}

export interface IFeed extends Request {
  timeline: number[];
  nextCursor: string | null;
}

export const selectExplore = (state: RootState) => state.explore.explore.byTag;
export const selectFetchExploreByTagReq = (state: RootState): FetchRequest => state.explore.getExploreByTagReq

export const selectExploreByTag = createSelector(
  [selectExplore, (state: RootState, tag: string) => tag],
  (exploreByTag, tag) => exploreByTag[tag]
)

const explore = (state: any = { byTag: {}}, action: any): any => {
  switch (action.type) {
    case ExploreActionTypes.APPEND_EXPLORE_CONTENT:
      let { byTag } = state;
      let { timeline, users } = action.response;
      let userId = Object.keys(users)[0];
      let profile = byTag[userId] || {};
      let feed = profile.timeline ? [...new Set([...profile.timeline, ...timeline])] : timeline;
      let userObj = {[action.tag] : { timeline: feed }};      
      return {
        byTag: Object.assign({}, state.byTag, userObj)
      }
    default:
      return state;
  }
}

const exploreReducer = combineReducers({
    explore,
    getExploreByTagReq: createReqReducer(ExploreReqActionTypes.GET_EXPLORE_BY_TAG),
})

export default exploreReducer;
