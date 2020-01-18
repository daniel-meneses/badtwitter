import React from "react";
import "./LikeButton.scss";

type Props = {
  post: {id: any,
         likes: any
        },
  hasBeenLiked: boolean,
  handlePostLikeClick: (e: any) => void
}

const LikeButton = ({post, hasBeenLiked, handlePostLikeClick}: Props) => {
  return (
    <div>
      <span className={"like_button"}
            data-key={post.id}
            data-liked={hasBeenLiked}
            onClick={handlePostLikeClick}
            >
            {hasBeenLiked? "Liked!" : "Like?"} + Likes: {post.likes}
          </span>
      </div>
  );
}

export default LikeButton;
