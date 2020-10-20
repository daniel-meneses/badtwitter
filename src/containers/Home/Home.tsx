import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { getPendingSubscriptionRequests,
         getAcceptedSubscriptionRequests } from '../../actions/subscription.js'
import { getAllUserLikes} from '../../actions/like.js'
import { getGlobalFeed, getGlobalAtCursor } from '../../actions/feed.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import Trending from '../../components/Trending/Trending';
import UserPost from '../../components/PostMini/UserPost';
import LoadingWrapper from '../../components/LoadingWrapper/LoadingWrapper'
import MainContainer from '../MainContainer/MainContainer'
import Header from '../../components/Header/Header';
import { usePersistedScroll } from '../../utils/hooks/useScroll';
import { throttle, debounce } from 'lodash'
import store from '../../store/store'

type Props = {
  getPendingSubscriptionRequests: () => void,
  getAcceptedSubscriptionRequests: () => void,
  getAllUserLikes: () => void,
  getGlobalFeed: () => void,
  global: {
      timeline: Array<number>,
      isFetching: boolean,
      afterCursor: string | null,
      isFetchingNextPage: boolean,
      errors: string | null,
      wasFetchedSuccessfully: boolean
  },
  currentUser: {avatar: string,
                user_id: number},
  scrollPosition: number,
  getGlobalAtCursor: (afterCursor :string) => void,
}

function mapStateToProps(state: any) {
  let feed = state.feed.global

  return {
    global: {
      timeline: feed.timeline,
      afterCursor: feed.afterCursor,
      isFetching: feed.isFetching,
      isFetchingNextPage: feed.isFetchingNextPage,
      errors: feed.errors,
      wasFetchedSuccessfully: feed.wasFetchedSuccessfully
    },
    currentUser: state.session.currentUser,
    scrollPosition: state.home.scrollPosition
  }
}

const Home = ({getPendingSubscriptionRequests,
              getAcceptedSubscriptionRequests,
              getAllUserLikes,
              getGlobalFeed,
              global,
              currentUser = {avatar: "", user_id: 0},
              scrollPosition,
              getGlobalAtCursor,
              } : Props) => {

  const history = useHistory();
  const scrollRef = typeof document !== "undefined" && document.getElementById("scrollable")

  useEffect(() => {
    if (!global.wasFetchedSuccessfully) {
      getGlobalFeed()
    }
    getPendingSubscriptionRequests()
    getAcceptedSubscriptionRequests()
    getAllUserLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onScrollExit = () => store.dispatch({type: 'SET_HOME_SCROLL_POSITION', position: scrollRef?.scrollTop})

  const fetchNext = throttle( (cursor) => getGlobalAtCursor(cursor), 2000)

  const onScroll = (pos) => {
    let percent = Math.round(((pos.y || 0) / (pos.total || 100)) * 100)
    let shouldFetch = percent > 60
    if (shouldFetch && global.afterCursor && !global.isFetchingNextPage) {
      fetchNext(global.afterCursor)
    }
  }

  usePersistedScroll({
    ref: scrollRef,
    initPos: scrollPosition,
    onScroll: onScroll,
    onExit: onScrollExit
  })


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
                isFetching={global.isFetching}
                errors={global.errors}
                >
                {
                  global.timeline && global.timeline.map( (postId: number, i: number) =>
                    <UserPost key={i} postId={postId}/>
                )}
              </LoadingWrapper>
        </>
       }

       mainRight=
       {
         <div>
           <Trending postId={1}/>
         </div>
       }

     />
   )

}

export default connect(mapStateToProps,
                        {getPendingSubscriptionRequests,
                         getAcceptedSubscriptionRequests,
                         getAllUserLikes,
                         getGlobalFeed,
                         getGlobalAtCursor})(Home)
