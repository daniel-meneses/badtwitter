import React, { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/userProfile';
import Trending from '../../components/Trending/Trending';
import ProfileHead from '../../components/ProfileHead/ProfileHead';
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper';
import MainContainer from '../MainContainer/MainContainer';
import Header from '../../components/Header/Header';
import UserPost from "../../components/PostMini/UserPost";
import { FetchRequest } from '../../types/common';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import styles from '../Home/Home.mod.scss';
import { selectUserProfileById } from '../../reducers/feeds';
import TrendingWidget from '../../components/Widget/TrendingWidget';

type ConnectedProps = {
  timeline: number[];
  nextCursor: string | null;
  getUserProfileReq: FetchRequest;
  userId: number;
  dispatch: AppThunkDispatch;
};

type OwnProps = {
  match: {
    params: {
      id: string;
    }
  }
}

type Props = ConnectedProps & OwnProps;

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  let { match: { params: { id: userId } } } = ownProps;
  let formattedId = parseInt(userId) || 0;
  let { timeline, nextCursor } = selectUserProfileById(state, userId) || {}
  return {
    timeline,
    nextCursor,
    userId: formattedId,
    getUserProfileReq: state.feeds.getUserProfileFeedRequest,
  }
}

const UserProfile: React.FC<Props> = (props) => {

  const { userId, timeline = [], nextCursor, getUserProfileReq, dispatch } = props;
  const history = useHistory()
  
  useEffect(() => {
    // TODO: Prevent duplicate profile fetch on client rehydrate
    dispatch(getUserProfile(userId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const location = useLocation<{from: string}>();
  const fromUrl = ( location.state || {}).from
  const headerText = fromUrl 
    ? fromUrl.split('/').pop()
    : 'Back';
  
  return (
    <MainContainer
      mainCenter={
        <>
          <Header
            title={headerText}
            onBackClick={() => history.goBack()}
            onTitleClick={() => history.push('/home')}
            displayBackButton={true}
          />
          <ProfileHead userId={userId} />
          <LoadingWrapper {...getUserProfileReq}>
            {timeline.length ?
              timeline.map((postId: number, i: number) => {
                const isLastItem = timeline.length === i + 1
                return (<UserPost 
                          key={postId}
                          className={isLastItem ? styles.addMarginToLastListItem : ''}
                          postId={postId}
                        />)
              })
                :
              getUserProfileReq.didSucceed && <ErrorMessage text={'No posts to display'} />
            }
          </LoadingWrapper>
        </>
      }
      mainRight={
        <TrendingWidget />
      }
    />

  );

}

export default connect(mapStateToProps)(UserProfile);
