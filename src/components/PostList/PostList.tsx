import React from "react";
import PostMini from "../PostMini/PostMini";

type Props = {
  feed: any,
  handlePostLikeClick: any,
  handlePostUserClick: any,
  hasBeenLiked: any,
  isExpanded: boolean
}

const PostList = ({feed, handlePostLikeClick, handlePostUserClick, hasBeenLiked, isExpanded}: Props) => {

  return (
    <div className="post_list">
      { feed.map( (post :any) =>
            <PostMini post={post}
                      handlePostLikeClick={handlePostLikeClick}
                      handlePostUserClick={handlePostUserClick}
                      hasBeenLiked={hasBeenLiked.includes(post.id)}
                      isExpanded={false}
                       />
                    )
                  }
      </div>
      )
}

PostList.defaultProps = {
  hasBeenLiked: false
}

export default PostList;
