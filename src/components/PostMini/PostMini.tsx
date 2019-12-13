import React, { useState } from "react";
import "./PostMini.scss";

export default function PostMiniComponent(props: any) {

  const handleLike = (e: any) => {
    props.handleLike(e);
  }

  const handleUserClick = (e: any) => {
    var userId = e.target.getAttribute("data-key")
    props.handlePostUserClick(userId)
  }

  const handlePostClick = (e: any) => {

  }
  var post = props.post;

  return (
      <div className='pm-comp' data-key={post.id} onClick={handlePostClick}>
        <h3 data-key={post.user_id} onClick={handleUserClick}>{post.first_name + " " + post.last_name} </h3>
        <p>{post.post} </p>
        <div className='pm-comp-ft'>
        <span id={post.id} className={props.hasBeenLiked ? "pm-comp-liked" : "pm-comp-l"} onClick={handleLike}>{props.hasBeenLiked? "Liked!" : "Like?"} + Likes: {post.likes}</span>
        <span>{post.created} </span>
        </div>
      </div>
  );
}
