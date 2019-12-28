import React from "react";
import PostMini from "../PostMini/PostMini";

type Props = {
  feed: any,
  handlePostLikeClick: any,
  handlePostUserClick: any,
  hasBeenLiked: any
}

const PostList = ({feed, handlePostLikeClick, handlePostUserClick, hasBeenLiked}: Props) => {

  return (
    <div className="post_list">
      { feed.map( (post :any) =>
            <PostMini post={post}
                      handlePostLikeClick={handlePostLikeClick}
                      handlePostUserClick={handlePostUserClick}
                      hasBeenLiked={hasBeenLiked.includes(post.id)} />
                    )
                  }
      </div>
      )
}

export default PostList;
