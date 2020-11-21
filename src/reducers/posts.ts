import { createSelector } from 'reselect';
import { Post } from '../types/common';

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
  likes: number;
  post: string;
  user_id: number;
  created: string;
}

export const selectPosts = (state: RootState) =>  state.post.byId;

export const selectPostById = createSelector(
    [selectPosts, (state: RootState, postId: number) => postId],
    (posts: any, postId: number) => posts[postId]
)

function formatPostResponse(posts: {[id: string]: PostResponse}): {[id: string]: Post} {
  let postState: {[id: string]: Post} = {}
  Object.values(posts).forEach( (post) => { 
      let id = post.id;
      postState[id] = formatPost(post) 
  })
  return postState
}

function formatPost(post: PostResponse): Post {
  const { user_id: userId, ...postInfo } = post
  return ({ userId, ...postInfo })
}

const posts = (state: any = { byId: {}}, action: any): any => {
  switch (action.type) {
    case PostActionTypes.APPEND_POSTS:
      const { posts } = action.response; 
      let formattedPosts = formatPostResponse(posts)
      return {
        byId: Object.assign({}, state.byId, formattedPosts)
      }
    case PostActionTypes.APPEND_NEW_USER_POST:
      var postResponse = formatPostResponse(action.response)
      return {
        byId: Object.assign({}, state.byId, postResponse)
      }
    case PostActionTypes.INCREMENT_POST_LIKE:
      var postId = action.response.post_id
      var post = {...state.byId[postId]}
      var likes = post.likes + 1
      var updated = {[post.id] : {...post, likes}}
      return {
         byId: Object.assign({}, state.byId, updated)
       }
    case PostActionTypes.DECREMENT_POST_LIKE:
      var postId = action.response.post_id
      var post = {...state.byId[postId]}
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
