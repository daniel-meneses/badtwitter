import React from 'react';
import { connect } from 'react-redux';
import { likeUserPost, unlikeUserPost } from '../../actions/likes';
import LikeIcon from '../../common/components/SvgLib/LikeIcon';
import Selectable from '../../common/components/Selectable/Selectable';
import { postIsLiked } from '../../selectors/likes';
import showGuestToast from '../Toast/GuestToast';

type StoreProps = {
  likeUserPost: (postId: number) => void,
  unlikeUserPost: (postId: number) => void,
  isLiked: boolean;
  isAuthenticated: boolean;
}

type OwnProps = {
  postId: number,
  className?: string,
}

type Props = StoreProps & OwnProps

const mapState = (state: any, { postId }: OwnProps) => ({ 
    isLiked: postIsLiked(state, postId),
    isAuthenticated: state.session.session.isAuthenticated
})

const LikeButton: React.FC<Props> = (props: Props) => {

  const { postId, isLiked, likeUserPost, unlikeUserPost, className, isAuthenticated } = props;

  let handlePostLikeClick = () => {
    if (!isAuthenticated) { return showGuestToast('Log in or sign up to like posts') }
    isLiked ? unlikeUserPost(postId) : likeUserPost(postId)
  }

  return (
    <>
    <Selectable
      testid='like-selectable'
      className={className}
      onClick={handlePostLikeClick}
      >
      <LikeIcon 
        data-testid="like-button"
        stroke='green' 
        fill={isLiked ? 'green' : 'white'} />
    </Selectable>
    </>
  );
}

export default connect(mapState, { likeUserPost, unlikeUserPost })(LikeButton);
