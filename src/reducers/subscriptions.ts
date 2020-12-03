import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createReqReducer } from './common'
import { mapKeys } from 'lodash';
import { SubscriptionResponse } from '../types/responseData';
import { Subscription } from '../types/common';

export enum SubscriptionReqActionTypes {
    GET_ALL_PENDING_SUBSCRIPTIONS = 'GET_ALL_PENDING_SUBSCRIPTIONS',
    GET_ALL_ACCEPTED_SUBSCRIPTIONS = 'GET_ALL_ACCEPTED_SUBSCRIPTIONS',
    GET_ALL_PENDING_FOLLOWERS = 'GET_ALL_PENDING_FOLLOWERS',
    GET_ALL_ACCEPTED_FOLLOWERS = 'GET_ALL_ACCEPTED_FOLLOWERS',
    POST_SUBSCRIPTION_REQUEST = 'POST_SUBSCRIPTION_REQUEST',
    UPDATE_FOLLOW_REQUEST = 'UPDATE_FOLLOW_REQUEST',
    DELETE_SUBSCRIPTION_REQUEST = 'DELETE_SUBSCRIPTION_REQUEST',
}

export enum SubscriptionActionTypes {
    APPEND_PENDING_SUBSCRIPTIONS = 'APPEND_PENDING_SUBSCRIPTIONS',
    APPEND_ACCEPTED_SUBSCRIPTIONS = 'APPEND_ACCEPTED_SUBSCRIPTIONS',
    APPEND_PENDING_FOLLOWERS = 'APPEND_PENDING_FOLLOWERS',
    APPEND_ACCEPTED_FOLLOWERS = 'APPEND_ACCEPTED_FOLLOWERS',
    UPDATE_FOLLOW = 'UPDATE_FOLLOW',
    DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION',
}

export const selectAcceptedSubscriptions = (state: RootState): SubscriptionMap => state.subscriptions.byType.subscriptions.accepted;
export const selectPendingSubscriptions = (state: RootState): SubscriptionMap => state.subscriptions.byType.subscriptions.pending;
export const selectAcceptedFollowers = (state: RootState): SubscriptionMap => state.subscriptions.byType.followers.accepted;
export const selectPendingFollowers = (state: RootState): SubscriptionMap => state.subscriptions.byType.followers.pending;

export const selectAcceptedSubscriptionUserIds = createSelector(
    [selectAcceptedSubscriptions],
    ( subscriptions ) => {
        return Object.values(subscriptions).map( s => s.subjectId)
    }
)

export const selectPendingSubscriptionUserIds = createSelector(
    [selectPendingSubscriptions],
    ( subscriptions ) => {
        return Object.values(subscriptions).map( s => s.subjectId)
    }
)

var parseFeed = (subscription: SubscriptionResponse[]) => {
    console.log(subscription)
    let subArr = subscription.map(s => {
        let { user, subject, created_at, ...rest} = s;
        return ({ 
            userId: user.id, 
            subjectId: subject.id, 
            createdAt: created_at, 
            ...rest
        });
    });
    
    return mapKeys(subArr, "id");
};


type SubscriptionMap = {
    [id:string] : Subscription
}

type InitialState = {
    subscriptions: {
        accepted: SubscriptionMap,
        pending: SubscriptionMap,
    },
    followers: {
        accepted: SubscriptionMap,
        pending: SubscriptionMap,
    },
};

const initialState: InitialState = {
    subscriptions: {
        accepted: {},
        pending: {}
    },
    followers: {
        accepted: {},
        pending: {}
    }
}


const subscription = (state = initialState, action: any): any => {
    switch (action.type) {
        case SubscriptionActionTypes.APPEND_ACCEPTED_SUBSCRIPTIONS:
            var { subscriptions } = action.response;
            var accepted = state.subscriptions.accepted
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    accepted: Object.assign({}, accepted, parseFeed(subscriptions)),
                }
            };
        case SubscriptionActionTypes.APPEND_PENDING_SUBSCRIPTIONS:
            var { subscriptions } = action.response
            var pending = state.subscriptions.pending
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    pending: Object.assign({}, pending, parseFeed(subscriptions)),
                }
            };
        case SubscriptionActionTypes.APPEND_ACCEPTED_FOLLOWERS:
            var { subscriptions } = action.response;
            var accepted = state.followers.accepted
            return {
                ...state,
                followers: {
                    ...state.followers,
                    accepted: Object.assign({}, accepted, parseFeed(subscriptions)),
                }
            };
        case SubscriptionActionTypes.APPEND_PENDING_FOLLOWERS:
            var { subscriptions } = action.response
            var pending = state.followers.pending
            return {
                ...state,
                followers: {
                    ...state.followers,
                    pending: Object.assign({}, pending, parseFeed(subscriptions)),
                }
            };
        case SubscriptionActionTypes.UPDATE_FOLLOW:
            var id = action.response.id;
            var { [id] : _value, ...rest } = state.followers.pending;
            return {
                ...state,
                followers: {
                    ...state.followers,
                    pending: {
                        ...rest
                    }
                }
            };
        case SubscriptionActionTypes.DELETE_SUBSCRIPTION:
            var id = action.response.id;
            var { [id] : _value, ...rest } = state.subscriptions.accepted;
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    accepted: {
                        ...rest
                    }
                }
            };
        default:
            return state;
    }
}

export const subscriptionsReducer = combineReducers({
    byType: subscription,
    getAcceptedSubscriptions: createReqReducer(SubscriptionReqActionTypes.GET_ALL_ACCEPTED_SUBSCRIPTIONS),
    getPendingSubscriptions: createReqReducer(SubscriptionReqActionTypes.GET_ALL_PENDING_SUBSCRIPTIONS),
})

export default subscriptionsReducer;