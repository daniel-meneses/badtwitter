import { Post, Posts } from '../types/common';
import { getPostById } from '../selectors/posts';

export enum PostReqActionTyoes {
  POST_NEW_POST = 'POST_NEW_POST'
}

export enum PostActionTypes {
  APPEND_POSTS = 'APPEND_POSTS',
  APPEND_NEW_USER_POST = 'APPEND_NEW_USER_POST',
  INCREMENT_POST_LIKE = 'INCREMENT_POST_LIKE',
  DECREMENT_POST_LIKE = 'DECREMENT_POST_LIKE'
}

type PostResponse = {
  id: number;
  likes: number[];
  post: string;
  user_id: number;
  created: string;
}

type PostsResponse = {
  [id: string]: PostReqActionTyoes
}

const posts = (state: any = {}, action: any): any => {
  switch (action.type) {
    case PostActionTypes.APPEND_POSTS:
      return {
        byId: Object.assign({}, state.byId, action.response.posts)
      }
    case PostActionTypes.APPEND_NEW_USER_POST:
      return {
        byId: Object.assign({}, state.byId, action.response)
      }
    case PostActionTypes.INCREMENT_POST_LIKE:
      var postId = action.response.post_id
      var post = getPostById(state, postId)
      var likes = post.likes + 1
      var updated = {[post.id] : {...post, likes}}
      return {
         byId: Object.assign({}, state.byId, updated)
       }
    case PostActionTypes.DECREMENT_POST_LIKE:
      var postId = action.response.post_id
      var post = getPostById(state, postId)
      var likes: any = post.likes - 1
      var updated = {[post.id] : {...post, likes}}
      return {
         byId: Object.assign({}, state.byId, updated)
      }
    default:
      return state;
  }
}

export default posts;
