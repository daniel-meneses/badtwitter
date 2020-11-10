import React, { useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import './UserProfile.scss';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/userProfile'
import Trending from '../../components/Trending/Trending';
import ProfileHead from '../../components/ProfileHead/ProfileHead'
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper'
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import UserPost from "../../components/PostMini/UserPost"

type ConnectedProps = {
  profileFeed: {
    timeline: number[];
  };
  getUserProfileReq: any;
  getUserProfile: (id: number) => void;
  userId: number;
};

type OwnProps = {
  match: {
    params: {
      id: number;
    }
  }
}

type Props = ConnectedProps & OwnProps;

function mapStateToProps(state: any, ownProps: OwnProps) {
  
  let { userProfiles, getUserProfileReq } = state.userProfiles
  let { match } = ownProps
  let userId = match && match.params.id
  let profileFeed = userProfiles.byUserId[userId] || {}  
  return {
    userId,
    profileFeed,
    getUserProfileReq,
  }
}

const UserProfile: React.FC<Props> = (props: Props) => {

  const { userId, profileFeed, getUserProfile, getUserProfileReq } = props;
  const history = useHistory()

  useEffect(() => {
    // TODO: Prevent duplicate profile fetch on client rehydrate
      getUserProfile(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { timeline } = profileFeed;
  
  return (
    <MainContainer
      mainCenter={
        <>
          <Header
            title={'Home'}
            onBackClick={() => history.goBack()}
            onTitleClick={() => history.push('/home')}
            displayBackButton={true}
            />
          <ProfileHead userId={userId}/>
             <LoadingWrapper
               isFetching={getUserProfileReq.isFetching}
               errors={getUserProfileReq.error}
               >
               { timeline &&
                 timeline.map( (postId: number) =>
                 <UserPost key={postId}
                           postId={postId}
                           />)
                }
             </LoadingWrapper>
        </>
      }
      mainRight={
        <div>
          <Trending postId={1}/>
        </div>
      }
    />

  );

}

export default connect(mapStateToProps, {getUserProfile})(UserProfile);
