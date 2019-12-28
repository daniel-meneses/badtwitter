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
  return (
      <div className='post_mini'
           data-key={post.id}>
        <h3 data-key={post.user_id}
            onClick={handlePostUserClick}>
              {post.first_name + " " + post.last_name}
            </h3>
        <p> {post.post} </p>
        <div className='post_mini_footer'>
          <span className={"like_button"}
                id={post.id}
                data-key={hasBeenLiked}
                onClick={handlePostLikeClick}>
                {hasBeenLiked? "Liked!" : "Like?"} + Likes: {post.likes}
                </span>
                <span>{post.created} </span>
          </div>
      </div>
  );
}

export default PostMiniComponent;
