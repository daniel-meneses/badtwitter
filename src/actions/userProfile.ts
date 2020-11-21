import { Dispatch } from 'redux';
import * as actions from './common'
import api from '../api/api';
import { UserProfileReqActionTypes, UserProfileActionTypes } from '../reducers/userProfile';
import { UsersActionTypes } from '../reducers/users';
import { PostActionTypes } from '../reducers/posts';

export function getUserProfile(userId: number, headers = {}): AppThunk {
    let type = UserProfileReqActionTypes.GET_USER_PROFILE
    return (dispatch: Dispatch) => {
        dispatch(actions.reqStart(type))
        return api.fetch('/feed/user/' + userId, {}, headers)
            .then((response) => {
                dispatch(actions.reqSuccess(type))
                dispatch({ type: UsersActionTypes.APPEND_USERS, response})
                dispatch({ type: PostActionTypes.APPEND_POSTS, response})
                dispatch({ type: UserProfileActionTypes.APPEND_USER_PROFILE, response });
            })
            .catch((error) => {                
                dispatch(actions.reqFail(type, error))
            });
    }
}