import { combineReducers } from 'redux';
import { createReqReducer } from './common';

export enum FeedReqActionTypes {
    GET_GLOBAL_FEED = 'GET_GLOBAL_FEED',
}

export enum FeedActionTypes {
    APPEND_GLOBAL_FEED = 'APPEND_GLOBAL_FEED',
    APPEND_FEED_NEW_USER_POST = 'APPEND_FEED_NEW_USER_POST',
}

interface IFeed {
    timeline: number[];
    nextCursor: string | null;
}

const initial: IFeed = {
    timeline: [],
    nextCursor: null,
}

const feed = (state = initial, action: any) => {
    switch (action.type) {
        case FeedActionTypes.APPEND_GLOBAL_FEED:
            let { timeline = [], after_cursor: nextCursor } = action.response;
            return {
                timeline: timeline.length ? [...new Set([...state.timeline, ...timeline])] : timeline,
                nextCursor
            }
        case FeedActionTypes.APPEND_FEED_NEW_USER_POST:            
            let post: any = Object.values(action.response)[0] || {}
            return post.id ? {
                timeline: [post.id, ...state.timeline],
             } : state;
        default:
            return state;
    }
}

const feedReducer = combineReducers({
    feed,
    getGlobalFeedReq: createReqReducer(FeedReqActionTypes.GET_GLOBAL_FEED),
})

export default feedReducer;