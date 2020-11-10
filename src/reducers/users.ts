import { User, Users } from '../types/common';

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
    [id: string] : UserResponse
}

function formatUsersResponse(users: UsersResponse): any {
    let tempFormat = users.users || users
    let usersObj: Users = {}
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

type state = {
    byId: Users;
}

const users = (state: state = { byId: {} }, action: any): any => {
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
