import React from "react";
import "./PostMini.scss";
import LikeButton from '../LikeButton/LikeButton';

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
  hasBeenLiked: boolean,
  isExpanded: boolean
}

const PostMiniComponent = ({post, handlePostLikeClick, handlePostUserClick, hasBeenLiked, isExpanded}: Props) => {
  return (
      <div className='post_mini_component' data-key={post.id}>
        <h3 data-key={post.user_id}
            onClick={handlePostUserClick}>
              {post.first_name + " " + post.last_name}
            </h3>
            <i className="arrow down"
               onClick={handlePostUserClick}
               ></i>
        <p> {post.post} </p>
        <div className='post_mini_footer'>
          <LikeButton post={post}
                      hasBeenLiked={hasBeenLiked}
                      handlePostLikeClick={handlePostLikeClick}
                      />
                <span>{post.created} </span>
          </div>
      </div>
  );
}

export default PostMiniComponent;
