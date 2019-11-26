import React, { useState } from "react";
import "./PostMini.scss";

export default function PostMiniComponent(props: any) {


  const handleLike = (e: any) => {
    props.onClick(e);
  }

  return (
      <div className='postmini-component'>
        <h3>{props.post.first_name + " " + props.post.last_name} </h3>
        <p>{props.post.post} </p>
        <span id={props.post.id} onClick={handleLike}>Likes: {props.post.likes}</span>
        <span>Views: {props.post.views}</span>
        <span>Created: {props.post.created} </span>
      </div>
  );
}
