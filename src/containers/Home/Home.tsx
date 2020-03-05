import React, { useEffect } from 'react'
import './Home.scss';
import { getPendingSubscriptionRequests,
         getAcceptedSubscriptionRequests } from '../../actions/subscription.js'
import { getAllUserLikes} from '../../actions/like.js'
import { getGlobalFeed } from '../../actions/feed.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import Trending from '../../components/Trending/Trending';
import GlobalFeed from '../../components/GlobalFeed/GlobalFeed';
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
  }
}

function mapStateToProps(state: any) {
  let global = state.feed.global
  return {
    global: {
      timeline: global.timeline,
      isFetching: global.isFetching,
      errors: global.errors
    }
  }
}

const Home = ({getPendingSubscriptionRequests,
              getAcceptedSubscriptionRequests,
              getAllUserLikes,
              getGlobalFeed,
              global} : Props) => {

  useEffect(() => {
    getPendingSubscriptionRequests();
    getAcceptedSubscriptionRequests();
    getAllUserLikes();
    getGlobalFeed();
   }, [])

   const history = useHistory();

   var feedDisplayable = null
   const feedCount = global.timeline.length

   if (global.isFetching) {
     if (!feedCount) {
       feedDisplayable = <EmptyListMessage message={"Show big loading spinner."} />
     } else {
       feedDisplayable = <EmptyListMessage message={"Show available feed + small loading spinner"} />
     }
   }

   if (global.errors) {
     if (!feedCount) {
       feedDisplayable = <EmptyListMessage message={"Show big error message."} />
     } else {
       feedDisplayable = <EmptyListMessage message={"Show available feed + small error message"} />
     }
   }

   if (!global.errors && !feedCount) {
     feedDisplayable = <EmptyListMessage message={"No post to display."} />
   } else {
     feedDisplayable = <GlobalFeed globalTimeline={global.timeline}/>
   }

   return (
     <div className={'main_container'}>
       <div className={'center_container'}>
         <h2 className={'center_container_header selectable'} onClick={() => history.push('/')}>
           Home
         </h2>

       <div className={'center_container_body'}>
         <div className={'new_post_form'}>
          <PostForm/>
          </div>
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
