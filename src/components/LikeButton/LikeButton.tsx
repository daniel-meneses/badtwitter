import React from 'react'
import './LikeButton.scss'
import { connect } from 'react-redux'
import { postLike, deleteLike} from '../../actions/like.js'
import { bindActionCreators } from 'redux'

type Props = {
  postId: number,
  likedPostIds: Array<number>,
  postLike: (e: any) => void,
  deleteLike: (e: any) => void
}

function mapStateToProps(state :any) {
  return { likedPostIds: state.likes.likedPostIds }
}

const mapDispatchToProps = { postLike, deleteLike }

const LikeButton = ({postId, likedPostIds, postLike, deleteLike }: Props) => {

  let isLiked = likedPostIds.includes(postId);

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
            onClick={handlePostLikeClick}
            >
            {isLiked? "Liked!" : "Like?"}
          </span>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
