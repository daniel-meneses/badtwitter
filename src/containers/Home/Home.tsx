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
import { usePersistedScroll } from '../../utils/hooks/useScroll';
import { SrollPositionActionTypes } from '../../reducers/ui';


type StoreProps = {
  getPendingSubscriptionRequests: () => void,
  getAcceptedSubscriptionRequests: () => void,
  getAllLikes: () => void,
  getGlobalFeed: (cursor?: string | null) => void,
  timeline: number[],
  nextCursor: string | null,
  getGlobalFeedReq: any,
  scrollPosition: number,
  onScrollExit: (scrollRef: any) => void,
  isAuthenticated: boolean,
}

function mapStateToProps(state: any) {
  let { timeline, nextCursor } = state.feed.feed

  return {
    timeline,
    nextCursor,
    getGlobalFeedReq: state.feed.getGlobalFeedReq,
    scrollPosition: state.ui.scrollPosition.home,
    isAuthenticated: state.session.session.isAuthenticated
  }
}

const onScrollExit = (scrollRef: any) => ({ type: SrollPositionActionTypes.SET_HOME_SCROLL_POSITION, position: scrollRef?.scrollTop || 0 })

const Home = (props: StoreProps) => {

  const {
    getPendingSubscriptionRequests,
    getAcceptedSubscriptionRequests,
    getAllLikes,
    getGlobalFeed,
    scrollPosition,
    timeline,
    nextCursor,
    getGlobalFeedReq,
    onScrollExit,
    isAuthenticated,
  } = props

  const history = useHistory();
  const scrollRef: any = typeof document !== "undefined" && document.getElementById("scrollable")

  useEffect(() => {
    // Prevent duplicate data fetch on client rehydrate
    if (!getGlobalFeedReq.didSucceed) {
      getGlobalFeed()
    }
    // These requests are made only on client rehydrate
    getPendingSubscriptionRequests()
    getAcceptedSubscriptionRequests()
    getAllLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onScroll = (pos: any) => {
    let percent = Math.round(((pos.y || 0) / (pos.total || 100)) * 100)
    let shouldFetch = percent > 60
    
    if (shouldFetch && nextCursor && !getGlobalFeedReq.isFetching) {
      getGlobalFeed(nextCursor)
    }
  }

  usePersistedScroll({
    ref: scrollRef,
    initPos: scrollPosition,
    onScroll: onScroll,
    onExit: onScrollExit
  })

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
          <LoadingWrapper
            isFetching={isFetching}
            errors={error}
          >
            {
              timeline && timeline.map((postId: number, i: number) =>
                <UserPost
                  key={i}
                  postId={postId}
                  />
              )}
          </LoadingWrapper>
        </>
      }

      mainRight=
      {
        <>
        {
          !isAuthenticated && <Header
          title={'Login/Register'}
          isRightHeader={true}
          onTitleClick={() => history.push('/signup')}
        />
        }
        <div>
          <Trending postId={1} />
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
    onScrollExit,
  })(Home)
