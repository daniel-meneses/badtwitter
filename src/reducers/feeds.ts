import { combineReducers } from 'redux';
import { createReqReducer } from './common';
import { camelCase, mapKeys } from 'lodash';
import { FeedResponse } from '../types/responseData';
import { createSelector } from 'reselect';

export enum FeedReqActionTypes {
    GET_GLOBAL_FEED = 'GET_GLOBAL_FEED',
    GET_HOME_FEED = 'GET_HOME_FEED',
    GET_USER_PROFILE_FEED = 'GET_USER_PROFILE_FEED',
    GET_TAG_FEED = 'GET_TAG_FEED',
}

export enum FeedActionTypes {
    APPEND_GLOBAL_FEED = 'APPEND_GLOBAL_FEED',
    APPEND_USER_PROFILE_FEED = 'APPEND_USER_PROFILE_FEED',
    APPEND_TAG_FEED = 'APPEND_TAG_FEED',
    APPEND_HOME_FEED = 'APPEND_HOME_FEED',
}

type Feed = {
    timeline: number[];
    afterCursor: string;
}

type FeedMap = {
    [id: string] : Feed
}

type InitialState = {
    global: Feed;
    home: Feed;
    tag: { byName: FeedMap };
    userProfile: { byId: FeedMap };
}

const feedInit: Feed = {
    timeline: [],
    afterCursor: ''
}

const initialState: InitialState = {
    global: { ...feedInit },
    home: { ...feedInit },
    tag: { byName: {}, },
    userProfile: { byId: {} },
}

var parseFeedSave = (feed: FeedResponse) => {

    let { posts = [], users = [], after_cursor } = feed;

    let timeline: number[] = [];
    let postArr = posts.map(p => {
        timeline.push(p.id)
        return mapKeys(p, (_v, k) => camelCase(k))
    })

    let userArr = users.map(u => mapKeys(u, (_v, k) => camelCase(k)));
    return ({
        timeline,
        posts: mapKeys(postArr, "id"),
        users: mapKeys(userArr, "id"),
        nextCursor: after_cursor
    })
}

var parseFeed = (feed: FeedResponse) => {

    let { posts = [], after_cursor } = feed;
    let timeline: number[] = posts.map(p => p.id);

    return ({
        timeline,
        nextCursor: after_cursor
    })
}

const appendTimeline = (timeline: number[] = [], timelineArr: number[]) => 
    timelineArr.length 
        ? [...new Set([...timeline, ...timelineArr])] 
        : timeline;

interface AppendFeed {
    type: FeedActionTypes;
    response: FeedResponse;
}

interface AppendUserProfile extends AppendFeed {
    userId: string;
}

interface AppendTagFeed extends AppendFeed {
    tag: string;
}

type ActionTypes = AppendFeed & AppendUserProfile & AppendTagFeed;

export const selectHomeFeed = (state: RootState) => state.feeds.byType.home;
export const selectGlobalFeed = (state: RootState) => state.feeds.byType.global;
export const selectTagFeed = (state: RootState) => state.feeds.byType.tag.byName;
export const selectUserProfileFeed = (state: RootState) => state.feeds.byType.userProfile.byId;

export const selectUserProfileById = createSelector(
    [selectUserProfileFeed, (state: RootState, id: any) => id],
    ( feed, id ) => {
        return feed[id]
    }
)

export const selectTagFeedByName = createSelector(
    [selectTagFeed, (state: RootState, name: string) => name],
    ( feed, name ) => {
        return feed[name]
    }
)


const feed = (state = initialState, action: ActionTypes): any => {
    switch (action.type) {
        case FeedActionTypes.APPEND_GLOBAL_FEED:
            var { timeline, nextCursor } = parseFeed(action.response)
            var stateTimeline = state.global.timeline;
            return {
                ...state,
                global: {
                    timeline: appendTimeline(stateTimeline, timeline),
                    nextCursor
                }
            }
        case FeedActionTypes.APPEND_HOME_FEED:
            var { timeline, nextCursor } = parseFeed(action.response);
            var stateTimeline = state.home.timeline;
            return {
                ...state,
                home: {
                    timeline: appendTimeline(stateTimeline, timeline),
                    nextCursor
                }
            }
        case FeedActionTypes.APPEND_TAG_FEED:
            var { response, tag } = action;
            var { timeline, nextCursor } = parseFeed(response);
            var tagFeed = { 
                timeline: appendTimeline((state.tag.byName[tag] || {}).timeline, timeline),
                nextCursor,
            }
            return {
                ...state,
                tag: {
                    byName: Object.assign({}, state.tag.byName, {[tag]: tagFeed})
                }
            }
        case FeedActionTypes.APPEND_USER_PROFILE_FEED:
            var { response, userId } = action;
            var { timeline, nextCursor } = parseFeed(response)
            var profileFeed = { 
                timeline: appendTimeline((state.userProfile.byId[userId] || {}).timeline, timeline),
                nextCursor,
            }
            return {
                ...state,
                userProfile: {
                    byId: Object.assign({}, state.tag.byName, {[userId]: profileFeed})
                }
            }
        default:
            return state;
    }
}

const feedReducer = combineReducers({
    byType: feed,
    getGlobalFeedRequest: createReqReducer(FeedReqActionTypes.GET_GLOBAL_FEED),
    getHomeFeedRequest: createReqReducer(FeedReqActionTypes.GET_HOME_FEED),
    getUserProfileFeedRequest: createReqReducer(FeedReqActionTypes.GET_USER_PROFILE_FEED),
    getTagFeedRequest: createReqReducer(FeedReqActionTypes.GET_TAG_FEED),
})

export default feedReducer;