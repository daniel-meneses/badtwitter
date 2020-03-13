import React, { useEffect, useState, useRef } from 'react'
import './Home.scss';
import { getPendingSubscriptionRequests,
         getAcceptedSubscriptionRequests } from '../../actions/subscription.js'
import { getAllUserLikes} from '../../actions/like.js'
import { getGlobalFeed } from '../../actions/feed.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import Trending from '../../components/Trending/Trending';
import GlobalFeed from '../../components/GlobalFeed/GlobalFeed';
import GreenLoadingCircle from '../../components/ReactLoading/ReactLoading.js';
import EmptyListMessage from '../../components/EmptyListMessage/EmptyListMessage'
import { useHistory } from 'react-router-dom'

type Props = {
  getPendingSubscriptionRequests: () => void,
  getAcceptedSubscriptionRequests: () => void,
  getAllUserLikes: () => void,
  getGlobalFeed: () => void,
  global: {
      timeline: Array<number>,
      isFetching: boolean,
      errors: string | null
  },
  currentUser: {avatar: string,
                user_id: number}
}

function mapStateToProps(state: any) {
  let global = state.feed.global
  return {
    global: {
      timeline: global.timeline,
      isFetching: global.isFetching,
      errors: global.errors
    },
    currentUser: state.session.currentUser
  }
}

const Home = ({getPendingSubscriptionRequests,
              getAcceptedSubscriptionRequests,
              getAllUserLikes,
              getGlobalFeed,
              global,
              currentUser} : Props) => {

  useEffect(() => {
    getPendingSubscriptionRequests()
    getAcceptedSubscriptionRequests()
    getAllUserLikes()
    getGlobalFeed()
    document.getElementById("main-scroll")?.addEventListener('scroll', handleScroll)
    return () => {
      document.getElementById("main-scroll")?.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const [scrollPosition, setScrollPostition] = useState(0);
   const scrollEl = useRef<HTMLDivElement>(null);
   const history = useHistory()

   var loadingSpinner = null
   var feedDisplayable = null
   const feedCount = (global.timeline || {}).length

   function handleScroll() {
     let top = scrollEl.current?.scrollTop
     let total = scrollEl.current?.scrollHeight
     let percent = Math.round((top || 0) / (total || 1) * 100)
     setScrollPostition(percent)
   }

   // if user scrolled down view, fetch next content
   if (scrollPosition > 70) {
     console.log("heyooo")
     //fetch content
     //show small loading spinner at bottom
   }

   if (global.isFetching) {
     if (feedCount > 0) {
       loadingSpinner = <GreenLoadingCircle size='small'/>
       feedDisplayable = <GlobalFeed globalTimeline={global.timeline}/>
     } else {
       loadingSpinner = <GreenLoadingCircle size='large'/>
     }
   }

   if (global.errors) {
     loadingSpinner = null
     if (!feedCount) {
       feedDisplayable = <EmptyListMessage message={"Show big error message."} />
     } else {
       feedDisplayable = <div>
          <EmptyListMessage message={"An error occurred please try again"} />
          <div className={'divider'}> </div>
          <GlobalFeed globalTimeline={global.timeline}/>
            </div>
     }
   }

   if (!global.isFetching && !global.errors) {
     if (feedCount > 0) {
       feedDisplayable = <GlobalFeed globalTimeline={global.timeline}/>
     } else {
       feedDisplayable = <EmptyListMessage message={"No post to display."} />
    }
   }

   return (
     <div className={'main_container'} id='main-scroll' ref={scrollEl}>
       <div className={'center_container'}>

         <h2 className={'center_container_header'}>
           <span className='header_avatar_container'>
                 <img className='header_avatar'
                      src={currentUser.avatar}
                      onClick={() => history.push('/user/' + currentUser.user_id)}/>
                      </span>
           <span className={'selectable'} onClick={() => history.push('/')}>
           Home
           </span>
         </h2>

       <div className={'center_container_body'} id='special'>
         <div className={'new_post_form'}>
          <PostForm />
          </div>
          {loadingSpinner}
         {feedDisplayable}
         </div>
       </div>

       <div className={'right_container'}>
         <div className={'trending_container'}>
           <Trending postId={1}/>
           </div>
        </div>
    </div>
   )

}

export default connect(mapStateToProps,
                        {getPendingSubscriptionRequests,
                         getAcceptedSubscriptionRequests,
                         getAllUserLikes,
                         getGlobalFeed})(Home)
