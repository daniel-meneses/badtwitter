import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  getPendingSubscriptionRequests,
  getAcceptedSubscriptionRequests
} from '../../actions/subscriptions'
import { getAllLikes } from '../../actions/likes'
import { getGlobalFeed } from '../../actions/feed'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import Trending from '../../components/Trending/Trending';
import UserPost from '../../components/PostMini/UserPost';
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper'
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import styles from './Home.mod.scss';
import { useScrollCallback } from '../../utils/hooks/useScrollHooks'
import { getExploreContentWithTag } from '../../actions/explore'
import { selectIsAuthenticated } from '../../reducers/session'
import { selectGlobalFeed, selectHomeFeed } from '../../reducers/feeds';
import ToggleSwitch from '../../common/components/Toggle/Toggle'

type StoreProps = {
  getPendingSubscriptionRequests: () => void,
  getAcceptedSubscriptionRequests: () => void,
  getAllLikes: () => void,
  getGlobalFeed: (cursor?: string | null) => void,
  timeline: number[],
  nextCursor: string | null,
  getGlobalFeedReq: any,
  isAuthenticated: boolean,
  getExploreContentWithTag: any,
}

function mapStateToProps(state: RootState) {
  let { timeline, nextCursor } = selectGlobalFeed(state);
  console.log(state)
  return {
    timeline,
    nextCursor,
    getGlobalFeedReq: state.feeds.getGlobalFeedRequest,
    isAuthenticated: selectIsAuthenticated(state)
  }
}


const Home = (props: StoreProps) => {

  const {
    getPendingSubscriptionRequests,
    getAcceptedSubscriptionRequests,
    getAllLikes,
    getGlobalFeed,
    timeline,
    nextCursor,
    getGlobalFeedReq,
    isAuthenticated,
  } = props

  const history = useHistory();

  useEffect(() => {
    // Prevent duplicate data fetch on client rehydrate
    if (!getGlobalFeedReq.didSucceed) {
      getGlobalFeed()
    }
    // These requests are made only on client rehydrate
    if (isAuthenticated) {
      getPendingSubscriptionRequests()
      getAcceptedSubscriptionRequests()
      getAllLikes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetcNextContentPage = (scrollPercent: number) => {
    let shouldFetch = scrollPercent > 60
    if (shouldFetch && nextCursor && !getGlobalFeedReq.isFetching) {      
      getGlobalFeed(nextCursor)
    }
  }

  useScrollCallback(fetcNextContentPage);
  
  const { isFetching, error } = getGlobalFeedReq;
  

  return (
    <MainContainer
      mainCenter=
      {
        <>
          <Header
            title={'Home'}
            onTitleClick={() => history.push('/home')}
          />
          <PostForm />
          <ToggleSwitch className='n' />
          <LoadingWrapper
            isFetching={isFetching}
            errors={error}
          >
            {
              timeline && timeline.map((postId: number, i: number) => {
                const isLastItem = timeline.length === i + 1
                return (
                  <UserPost
                  key={i}
                  className={isLastItem ? styles.addMarginToLastListItem : ''}
                  postId={postId}
                  />
                )
              }
              )}
          </LoadingWrapper>
        </>
      }

      mainRight=
      {
        <>
        {
          !isAuthenticated && 
          <Header
            title={'Login/Register'}
            isRightHeader={true}
            onTitleClick={() => history.push('/signup')}
          />
        }
        <div>
          <Trending />
        </div>
        </>
      }

    />
  )

}

export default connect(mapStateToProps,
  {
    getPendingSubscriptionRequests,
    getAcceptedSubscriptionRequests,
    getGlobalFeed,
    getAllLikes,
    getExploreContentWithTag,
  })(Home)
