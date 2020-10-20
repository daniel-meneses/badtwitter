import React from 'react'
import './LikeButton.scss'
import { connect } from 'react-redux'
import { postLike, deleteLike} from '../../actions/like.js'
import LikeIcon from '../../common/components/SvgLib/LikeIcon'
import Selectable from '../../common/components/Selectable/Selectable'
import classNames from  'classnames'

type Props = {
  className?: string,
  postId: number,
  likedPostIds: Array<number>,
  postLike: (postId: number) => void,
  deleteLike: (postId: number) => void
}

function mapStateToProps(state :any) {
  return { likedPostIds: state.likes.likedPostIds }
}

const LikeButton = ({postId, likedPostIds, postLike, deleteLike, className }: Props) => {

  let isLiked = likedPostIds.includes(postId);

  let handlePostLikeClick = (e: any) => {
      if (isLiked) {
        deleteLike(postId)
      } else {
        postLike(postId)
      }
    }

  return (
    <Selectable
      className={className}
      onClick={handlePostLikeClick}
      >
      <LikeIcon stroke='green' fill={isLiked ? 'green' : 'white'}/>
    </Selectable>
  );
}

export default connect(mapStateToProps, {postLike, deleteLike})(LikeButton);
