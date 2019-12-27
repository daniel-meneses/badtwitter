import React from "react";

type Props = {
  feed: any,
  handlePostLikeClick: any,
  handlePostUserClick: any,
  hasBeenLiked: any,
  displayPostMini: ( post: any,
                     handlePostLikeClick: any,
                     handlePostUserClick: any,
                     hasBeenLiked: any ) => JSX.Element
}

const PostList = ({feed, handlePostLikeClick, handlePostUserClick, hasBeenLiked, displayPostMini }: Props) => {

  return (
    <div className="post_list">
      { feed.map((p :any) => displayPostMini(p, handlePostLikeClick, handlePostUserClick, hasBeenLiked.includes(p.id))) }
    </div>
  );
}

export default PostList;
