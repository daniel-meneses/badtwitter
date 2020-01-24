import React from "react";
import "./LikeButton.scss";
import { connect } from 'react-redux';
import { postLike, deleteLike} from '../../actions/like.js';
import { bindActionCreators } from 'redux';

type Props = {
  postId: number,
  hasBeenLiked: Array<number>,
  postLike: (e: any) => void,
  deleteLike: (e: any) => void
}

const LikeButton = ({postId, hasBeenLiked, postLike, deleteLike }: Props) => {

  let isLiked = hasBeenLiked.includes(postId);

  let handlePostLikeClick = (e: any) => {
    const data = {post_id: postId}
      if (isLiked) {
        deleteLike(data)
      } else {
        postLike(data)
      }
    }

  return (
    <div>
      <span className={"like_button"}
            data-key={postId}
            data-liked={isLiked}
            onClick={handlePostLikeClick}
            >
            {isLiked? "Liked!" : "Like?"}
          </span>
      </div>
  );
}

function mapStateToProps(state :any) {
  return {
    hasBeenLiked: state.post.hasBeenLiked
   };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({postLike, deleteLike}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
