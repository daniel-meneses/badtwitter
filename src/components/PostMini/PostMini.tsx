import React from "react";
import "./PostMini.scss";

export const PostMiniComponent = (props: any) => {

  const handleLike = (e: any) => {
    if (props.hasBeenLiked) {
      props.handleUnlike({post_id: e.target.id})
    } else {
      props.handleLike({post_id: e.target.id})
    }
  }

  const handleUserClick = (e: any) => {
    var userId = e.target.getAttribute("data-key")
    props.handlePostUserClick(userId)
  }

  const handlePostClick = (e: any) => {

  }

  var post = props.post;
  var liked = props.hasBeenLiked;
  return (
      <div className='pm-comp' data-key={post.id} onClick={handlePostClick}>
        <h3 data-key={post.user_id}
            onClick={handleUserClick}>
              {post.first_name + " " + post.last_name}
              </h3>
        <p>{post.post} </p>
        <div className='pm-comp-ft'>
        <span id={post.id}
              className={liked ? "pm-comp-liked" : "pm-comp-l"}
              onClick={handleLike}>
                {liked? "Liked!" : "Like?"} + Likes: {post.likes}
                </span>
        <span>{post.created} </span>
        </div>
      </div>
  );
}

export default PostMiniComponent;
