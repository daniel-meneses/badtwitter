import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getHomeFeed } from '../../actions/feed'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import UserPost from '../../components/PostMini/UserPost';
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper'
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import styles from './Home.mod.scss';
import { useScrollCallback } from '../../utils/hooks/useScrollHooks'
import { selectIsAuthenticated } from '../../reducers/session'
import { selectHomeFeed } from '../../reducers/feeds';
import Suggested from '../../components/SuggestedSubscriptions/SuggestedSubscriptions';
import TrendingWidget from '../../components/Widget/TrendingWidget';
import GuestHeader from '../../components/Header/GuestHeader';

type StoreProps = {
  timeline: number[],
  nextCursor: string | null,
  getGlobalFeedReq: any,
  isAuthenticated: boolean,
  dispatch: AppThunkDispatch;
}

function mapStateToProps(state: RootState) {
  let { timeline, nextCursor } = selectHomeFeed(state);
  return {
    timeline,
    nextCursor,
    getGlobalFeedReq: state.feeds.getHomeFeedRequest,
    isAuthenticated: selectIsAuthenticated(state)
  }
}

const GuestPrompt: React.FC = () => {

  const history = useHistory();
  return (
    <div data-testid={'home-guest-text'} className={styles.guestNotice}>
      <span className={styles.guestNoticeLink} onClick={() => history.push('/signup')}>{`Sign up `}</span> 
      or 
      <span className={styles.guestNoticeLink} onClick={() => history.push('/login')}> log in</span> to use home feed
    </div>
  )
}

const Home = (props: StoreProps) => {

  const { timeline, nextCursor, getGlobalFeedReq, isAuthenticated, dispatch } = props

  const history = useHistory();

  useEffect(() => {
    // Prevent duplicate data fetch on client rehydrate
    if (!getGlobalFeedReq.didSucceed) {
      isAuthenticated && dispatch(getHomeFeed())
    }
  }, [])

  const fetcNextContentPage = (scrollPercent: number) => {
    let shouldFetch = scrollPercent > 60
    if (shouldFetch && nextCursor && !getGlobalFeedReq.isFetching) {
      dispatch(getHomeFeed(nextCursor))
    }
  }

  useScrollCallback(fetcNextContentPage);

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
          {
            isAuthenticated ?
            <LoadingWrapper {...getGlobalFeedReq} >
            {
              timeline.length ? timeline.map((postId: number, i: number) => {
                const isLastItem = timeline.length === i + 1
                return (
                  <UserPost
                    key={i}
                    className={isLastItem ? styles.addMarginToLastListItem : ''}
                    postId={postId}
                  />
                )
            })
            :
            getGlobalFeedReq.didSucceed && <Suggested className={styles.whoToFollow}/>
          }
          </LoadingWrapper>
          :
          <GuestPrompt />
              
          }
        </>
      }

      mainRight=
      {
        <>
          {
            !isAuthenticated && <GuestHeader />
          }
          <TrendingWidget />
        </>
      }

    />
  )

}

export default connect(mapStateToProps)(Home)
