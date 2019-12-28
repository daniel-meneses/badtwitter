import React from 'react';
import './Home.scss';
import { withRouter } from 'react-router'
import { logout, getGlobalFeed } from '../../actions/session.js'
import { getPendingSubscriptionRequests, postSubscriptionRequest, getFollowers } from '../../actions/subscription.js'
import { getAllUserLikes, postLike, deleteLike} from '../../actions/like.js'
import { postMessage } from '../../actions/post.js'
import { connect } from 'react-redux';
import { isObjectEmpty } from '../../commons/helpers'
import { goToUserProfile } from '../../commons/actions'
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';
import Inbox from '../Inbox/Inbox';
import FollowersList from '../../components/FollowersList/FollowersList';

class Home extends React.Component<any, any> {

  componentDidMount() {
    this.props.getGlobalFeed();
    this.props.getPendingSubscriptionRequests();
    this.props.getAllUserLikes();
    this.props.getFollowers();
  }

  sendPost = (e: any) => {
    this.props.postMessage({message: e});
  }

  handlePostLikeClick = (e: any) => {
    const isLiked = e.target.getAttribute("data-key");
    const data = {post_id: e.target.id}
    if (isLiked == "true") {
      this.props.deleteLike(data)
    } else {
      this.props.postLike(data)
    }
  }


  public render() {
    let {feed, hasBeenLiked, logout, follower_users, history, postMessage} = this.props
    let shouldDisplayFollowers: boolean = !isObjectEmpty(follower_users)
    let shouldDisplayFeed: boolean = !isObjectEmpty(feed)

    return (
      <div className={'g-fd'}>
        <div className='s-comp'>
          Sidebar Container
          <button onClick={() => logout()}>LogOut</button>
          <Inbox />
        </div>
        <div className='f-comp'>
          <PostForm handleFormSubmit={(e :any) => postMessage({message: e})} />
            <div>
              {
                shouldDisplayFeed ?
                  <PostList feed={feed}
                            handlePostLikeClick={this.handlePostLikeClick}
                            handlePostUserClick={(e :any) => goToUserProfile(history, e.target.getAttribute("data-key"))}
                            hasBeenLiked={hasBeenLiked}
                            />
                  :
                  <></>
               }
               </div>
            </div>
          <div className='e-comp'>
            Explore Container
            {
              shouldDisplayFollowers ?
                <FollowersList followers={follower_users}
                               handleFollowerClick={(e :any)=> goToUserProfile(history, e.currentTarget.getAttribute("data-key"))}
                               />
                :
                <></>
             }
            </div>
        </div>
      );
  }
}

function mapStateToProps(state :any) {
  return {
    feed: state.feed.global_feed,
    pendingSubscriptionRequests: state.subscription.subscription_request_ids,
    hasBeenLiked: state.post.hasBeenLiked,
    follower_users: state.subscription.follower_users
  }
}

export default withRouter(connect(mapStateToProps
  , { logout, postMessage, getGlobalFeed, postLike, postSubscriptionRequest, getPendingSubscriptionRequests, getAllUserLikes, deleteLike, getFollowers })(Home) as any);
