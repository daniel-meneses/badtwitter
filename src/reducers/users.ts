import { User } from '../types/common';
import { createSelector } from 'reselect'

export enum UsersActionTypes {
    APPEND_USERS = 'APPEND_USERS',
}

type UserResponse = {
    user_id: number;
    alias: string;
    avatar: string;
    bio: string;
    first_name: string;
    last_name: string;
}

type UsersResponse = {
    [id: string]: UserResponse
}

type ACTION_APPEND_USERS = {
    type: UsersActionTypes.APPEND_USERS,
    response: UsersResponse,
}

const selectCurrentUserId = (state: RootState) => state.session.session.currentUserId;
const selectUsers = (state: RootState) => {
    return state.users.byId;
}

export const selectUserById = createSelector(
    [selectUsers, (state: RootState, itemId: number) => itemId],
    (users: any, userId: any) => users[userId]
)

export const selectCurrentUser = createSelector(
    [selectUsers, selectCurrentUserId],
    (users: any, userId: any) =>  users[userId]
)

function formatUsersResponse(users: UsersResponse): any {
    let tempFormat = users.users || users
    let usersObj: any = {}
    Object.values(tempFormat).forEach((user: any) => {
        let userId: number = user.user_id;
        usersObj[userId] = formatUser(user)
    })
    return usersObj
}

function formatUser(user: UserResponse): User {
    const { first_name: firstName, last_name: lastName, user_id: userId, ...userInfo } = user
    return ({
        firstName, lastName, userId, ...userInfo
    })
}

type usersState = {
    byId: { [userId: string]: User } | {};
}

const initialState: usersState = {
    byId: {}
}

const users = (state = initialState, action: ACTION_APPEND_USERS): any => {
    switch (action.type) {
        case UsersActionTypes.APPEND_USERS:
            var users = formatUsersResponse(action.response);
            return {
                byId: Object.assign({}, state.byId, users)
            }
        default:
            return state;
    }
}

export default users;
