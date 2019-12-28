import React from 'react';
import './Home.scss';
import { withRouter } from 'react-router'
import { logout, getGlobalFeed } from '../../actions/session.js'
import { getPendingSubscriptionRequests, postSubscriptionRequest, getFollowers } from '../../actions/subscription.js'
import { getAllUserLikes, postLike, deleteLike} from '../../actions/like.js'
import { postMessage } from '../../actions/post.js'
import { connect } from 'react-redux';
import { isObjectEmpty } from '../../commons/helpers'
import PostForm from '../../components/PostForm/PostForm';
import PostMini from '../../components/PostMini/PostMini';
import PostList from '../../components/PostList/PostList';
import Inbox from '../Inbox/Inbox';
import FollowersList from '../../components/FollowersList/FollowersList';
import FollowersListItem from '../../components/FollowersListItem/FollowersListItem';

class Home extends React.Component<any, any> {

  componentDidMount() {
    this.props.getGlobalFeed();
    this.props.getPendingSubscriptionRequests();
    this.props.getAllUserLikes();
    this.props.getFollowers();
  }

  sendPost = (e: any) => {
    this.props.postMessage({message:e});
  }

  handlePostUserClick = (e: any) => {
    this.goToUserProfile(e.target.getAttribute("data-key"))
  }

  handleFollowerClick = (e: any) => {
    this.goToUserProfile(e.currentTarget.getAttribute("data-key"))
  }

  goToUserProfile = (id: number) => {
    this.props.history.push("/user/" + id)
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
    let props = this.props
    let {feed, follower_users} = this.props
    let shouldDisplayFollowers: boolean = !isObjectEmpty(follower_users)
    let shouldDisplayFeed: boolean = !isObjectEmpty(feed)

      return (
          <div className={'g-fd'}>
              <div className='s-comp'>
              Sidebar Container
              <button onClick={() => props.logout()}>LogOut</button>
              <Inbox />
              </div>
                <div className='f-comp'>
                  <PostForm handleFormSubmit={this.sendPost} />
                    <div>
                      {
                        shouldDisplayFeed ?
                        <PostList feed={props.feed}
                                  handlePostLikeClick={this.handlePostLikeClick}
                                  handlePostUserClick={this.handlePostUserClick}
                                  hasBeenLiked={props.hasBeenLiked}
                         />
                        :
                        <></>
                      }
                    </div>
                  </div>
                  <div className='e-comp'>
                  Explore Container
                  {shouldDisplayFollowers ?
                    <FollowersList followers={this.props.follower_users}
                                   handleFollowerClick={this.handleFollowerClick}
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
  , { logout, postMessage, getGlobalFeed, postLike, postSubscriptionRequest, getPendingSubscriptionRequests, getAllUserLikes, deleteLike, getFollowers, FollowersListItem })(Home) as any);
