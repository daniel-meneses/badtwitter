import React, { useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import './UserProfile.scss';
import { connect } from 'react-redux';
import { getProfileFeed } from '../../actions/feed.js'
import Trending from '../../components/Trending/Trending';
import ProfileHead from '../../components/ProfileHead/ProfileHead'
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper'
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import UserPost from "../../components/PostMini/UserPost"
import { RootState } from '../../store/common/types';

type Props = {
  users: any,
  userProfiles: any,
  isFetching: boolean,
  errors: null | string,
  getProfileFeed: (id: number) => void;
  postSubscriptionRequest: (id: number) => void;
};

function mapStateToProps(state: any, ownProps: any) {
  let { feed, globalObject } = state;
  let { match } = ownProps
  let userId = match && match.params.id
  return {
    userProfile: globalObject.users[userId],
    userFeed: feed.profiles[userId],
    isFetching: (feed.profile || {}).isFetching,
    errors: (feed.profile || {}).errors,
  }
}

const UserProfile: React.FC<Props> = (props: Props) => {

  const { userProfile, userFeed, isFetching, errors, getProfileFeed, postSubscriptionRequest } = props;
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    getProfileFeed(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitFollowRequest = () => {
    postSubscriptionRequest(id)
  }

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
          <ProfileHead user={userProfile}/>
             <LoadingWrapper
               isFetching={isFetching}
               errors={errors}
               >
               { userFeed &&
                 userFeed.timeline.map( (postId: number) =>
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

export default connect(mapStateToProps, {getProfileFeed})(UserProfile);
