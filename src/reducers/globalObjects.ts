import { User, Post, UserMap, PostMap } from '../types/common';
import { createSelector } from 'reselect'
import { camelCase, mapKeys } from 'lodash';
import { UserResponse, PostResponse } from '../types/responseData';

export enum GlobalActionTypes {
    APPEND_USERS = 'APPEND_USERS',
    APPEND_CURRENT_USER = 'APPEND_CURRENT_USER',
    APPEND_POSTS = 'APPEND_POSTS',
    INCREMENT_POST_LIKE = 'INCREMENT_POST_LIKE',
    DECREMENT_POST_LIKE = 'DECREMENT_POST_LIKE',
}

type AppendUsersAction = {
    type: GlobalActionTypes.APPEND_USERS,
    response: {
        users: UserResponse[]
    },
}

type AppendPostsAction = {
    type: GlobalActionTypes.APPEND_POSTS,
    response: {
        posts: PostResponse[]
    },
}

type AdjustPostLikeAction = {
    type: GlobalActionTypes.INCREMENT_POST_LIKE | GlobalActionTypes.DECREMENT_POST_LIKE,
    response: {
        post_id: number;
    },
}

type Actions = AppendUsersAction & AppendPostsAction | AdjustPostLikeAction;

type InitialState = {
    users: {
        byId: { [userId: string]: User }
    },
    posts: {
        byId: { [userId: string]: Post }
    }
}

const selectCurrentUserId = (state: RootState) => state.session.session.currentUserId;
export const selectUsers = (state: RootState) => state.global.users.byId
export const selectPosts = (state: RootState) => state.global.posts.byId

export const selectUserById = createSelector(
    [selectUsers, (state: RootState, itemId: number) => itemId],
    (users: UserMap, userId: number) => users[userId]
)

export const selectCurrentUser = createSelector(
    [selectUsers, selectCurrentUserId],
    (users: UserMap, userId: number) => users[userId]
)

export const selectPostById = createSelector(
    [selectPosts, (state: RootState, id: number) => id],
    (posts: PostMap, id: number) => posts[id]
)

const initialState: InitialState = {
    users: {
        byId: {}
    },
    posts: {
        byId: {}
    }
};

var formatToObject = (arr: any[]) =>
    mapKeys(arr.map((a: UserResponse | PostResponse) => mapKeys(a, (_v, k) => camelCase(k))), "id");

const globalObjects = (state = initialState, action: any): any => {
    switch (action.type) {
        case GlobalActionTypes.APPEND_USERS:
            var users = action.response.users;            
            var byId = state.users.byId;
            return {
                ...state,
                users: {
                    byId: Object.assign({}, byId, formatToObject(users || [action.response])),
                },
            }
        case GlobalActionTypes.APPEND_POSTS:
            var posts = action.response.posts;
            //@ts-ignore
            var byId = state.posts.byId;
            return {
                ...state,
                posts: {
                    byId: Object.assign({}, byId, formatToObject(posts || [action.response])),
                }
            }
        case GlobalActionTypes.APPEND_CURRENT_USER:
            var user = action.response;
            var byId = state.users.byId;
            return {
                ...state,
                users: {
                    byId: Object.assign({}, byId, formatToObject([user])),
                },
            }
        case GlobalActionTypes.INCREMENT_POST_LIKE:
            var postId = action.response.post_id
            var post = {...state.posts.byId[postId]}
            var likes = post.likes + 1
            var updated = {[post.id] : {...post, likes}}
            return {
                ...state,
                posts: {
                    byId: Object.assign({}, state.posts.byId, updated)
                }
            }
        case GlobalActionTypes.DECREMENT_POST_LIKE:
            var postId = action.response.post_id
            var post = {...state.posts.byId[postId]}
            var likes: number = post.likes - 1
            var update = {[post.id] : {...post, likes}}
            return {
                ...state,
                posts: {
                    byId: Object.assign({}, state.posts.byId, update)
                }
            }
        default:
            return state;
    }
}

export default globalObjects;
