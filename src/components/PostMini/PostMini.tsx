import React from "react";
import "./PostMini.scss";

type Props = {
  post: { id: any,
          user_id: number,
          first_name: string,
          last_name: string,
          likes: string,
          post: string,
          created: number
        },
  handlePostLikeClick: (e: any) => void,
  handlePostUserClick: (e: any) => void,
  hasBeenLiked: boolean
}

const PostMiniComponent = ({post, handlePostLikeClick, handlePostUserClick, hasBeenLiked}: Props) => {

  const handleLike = (e: any) => {
    handlePostLikeClick({post_id: e.target.id})
  }

  const handleUserClick = (e: any) => {
    var userId = e.target.getAttribute("data-key")
    handlePostUserClick(userId)
  }

  const handlePostClick = (e: any) => {
    //TO:DO
  }

  var post = post;
  var liked = hasBeenLiked;
  return (
      <div className='pm-comp'
           data-key={post.id}
           onClick={handleUserClick}>
        <h3 data-key={post.user_id}
            onClick={handleUserClick}>
            {post.first_name + " " + post.last_name}
            </h3>
        <p>{post.post} </p>
      <div className='pm-comp-ft'>
        <span id={post.id}
              data-key={liked}
              className={liked ? "pm-comp-liked" : "pm-comp-l"}
              onClick={handlePostLikeClick}>
              {liked? "Liked!" : "Like?"} + Likes: {post.likes}
              </span>
        <span>{post.created} </span>
        </div>
      </div>
  );
}

export default PostMiniComponent;
