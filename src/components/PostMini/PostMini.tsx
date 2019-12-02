import React, { useState } from "react";
import "./PostMini.scss";

export default function PostMiniComponent(props: any) {
  const [hasBeenLiked, setHasBeenLiked] = useState(false);

  const handleLike = (e: any) => {
    console.log(hasBeenLiked)
    setHasBeenLiked(true);
    props.onClick(e);
  }

  const handleUserClick = (e: any) => {
    var userId = e.target.getAttribute("data-key")
    props.handlePostUserClick(userId)
  }

  const handlePostClick = (e: any) => {

  }

  return (
      <div className='pm-comp' data-key={props.post.id} onClick={handlePostClick}>
        <h3 data-key={props.post.user_id} onClick={handleUserClick}>{props.post.first_name + " " + props.post.last_name} </h3>
        <p>{props.post.post} </p>
        <div className='pm-comp-ft'>
        <span id={props.post.id} className={hasBeenLiked ? "pm-comp-liked" : "pm-comp-l"} onClick={handleLike}>Likes: {props.post.likes}</span>
        <span>{props.post.created} </span>
        </div>
      </div>
  );
}
