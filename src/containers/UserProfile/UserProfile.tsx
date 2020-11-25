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
import { selectFetchProfileReq, selectUserProfileById } from '../../reducers/userProfile';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import styles from '../Home/Home.mod.scss';

type ConnectedProps = {
  profileFeed: {
    timeline: number[];
  };
  getUserProfileReq: FetchRequest;
  getUserProfile: (id: number) => void;
  userId: number;
};

type OwnProps = {
  match: {
    params: {
      id: string;
    }
  }
}

type Props = ConnectedProps & OwnProps;

function mapStateToProps(state: any, ownProps: OwnProps) {
  let { match: { params: { id: userId } } } = ownProps;
  let formattedId = parseInt(userId) || 0;
  return {
    userId: formattedId,
    profileFeed: selectUserProfileById(state, formattedId) || {},
    getUserProfileReq: selectFetchProfileReq(state),
  }
}

const UserProfile: React.FC<Props> = (props) => {

  const { userId, profileFeed, getUserProfile, getUserProfileReq } = props;
  const history = useHistory()
  
  useEffect(() => {
    // TODO: Prevent duplicate profile fetch on client rehydrate
    getUserProfile(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { timeline = [] } = profileFeed;

  const loc = useLocation();
  //@ts-ignore
  const fromUrl = (loc.state || {}).from
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
          <LoadingWrapper
            isFetching={getUserProfileReq.isFetching}
            errors={getUserProfileReq.error}
          >
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
        <div>
          <Trending postId={1} />
        </div>
      }
    />

  );

}

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
