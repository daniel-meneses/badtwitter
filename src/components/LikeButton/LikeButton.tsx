import React from 'react';
import { connect } from 'react-redux';
import * as likeActions from '../../actions/likes';
import LikeIcon from '../../common/components/SvgLib/LikeIcon';
import Selectable from '../../common/components/Selectable/Selectable';
import showGuestToast from '../Toast/GuestToast';
import { selectIsAuthenticated } from '../../reducers/session';
import { selectLikedPosts } from '../../reducers/likes';

type StoreProps = {
  isLiked: boolean;
  isAuthenticated: boolean;
  dispatch: AppThunkDispatch;
}

type OwnProps = {
  postId: number,
  className?: string,
}

export const LikeButton: React.FC<StoreProps & OwnProps> = (props) => {

  const { postId, isLiked, className, isAuthenticated, dispatch } = props;
  const { unlikeUserPost, likeUserPost } = likeActions

  let handlePostLikeClick = () => {
    if (!isAuthenticated) { return showGuestToast('Log in or sign up to like posts') }
    isLiked ? dispatch(unlikeUserPost(postId)) : dispatch(likeUserPost(postId))
  }

  return (
    <>
      <Selectable
        testid={testIds.likeContainer}
        className={className}
        onClick={handlePostLikeClick}
      >
        <LikeIcon
          data-testid={testIds.likeSVG}
          stroke='green'
          fill={isLiked ? 'green' : 'white'} />
      </Selectable>
    </>
  );
}

export const testIds = {
  likeContainer: 'like-selectable',
  likeSVG: 'like-button'
}

export default connect((state: RootState, { postId }: OwnProps) => ({
  isLiked: selectLikedPosts(state).includes(postId),
  isAuthenticated: selectIsAuthenticated(state)
}))
  (LikeButton);
