import React from 'react';
import './Home.scss';
import { withRouter } from 'react-router'
import { logout, getGlobalFeed } from '../../actions/session.js'
import { getPendingSubscriptionRequests, postSubscriptionRequest, getFollowers } from '../../actions/subscription.js'
import { getAllUserLikes, postLike, deleteLike} from '../../actions/like.js'
import { postMessage } from '../../actions/post.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import PostMini from '../../components/PostMini/PostMini';
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

  logOut = () => {
    this.props.logout();
  }

  sendPost = (e: any) => {
    this.props.postMessage({message:e});
  }

  getGlobalFeed =  () => {
    this.props.getGlobalFeed()
  }

  addFriend = () => {
    this.props.postFollowRequest({user_id: 4})
  }

  handlePostUserClick = (userId: number) => {
    this.props.history.push("/user/" + userId)
  }

  public render() {

      return (
          <div className={'g-fd'}>
              <div className='s-comp'>
              Sidebar Container
              <button onClick={this.logOut}>LogOut</button>
              <Inbox />
              </div>
                <div className='f-comp'>
                  <PostForm handleFormSubmit={this.sendPost} />
                    <div>
                      { this.props.feed.length ?
                        this.props.feed.map((p :any) =>
                        <PostMini key={p.id}
                                  post={p}
                                  handlePostLikeClick={this.props.postLike}
                                  handlePostUserClick={this.handlePostUserClick}
                                  hasBeenLiked={this.props.hasBeenLiked.includes(p.id)}
                                  />)
                        :
                        <span>Feed Empty</span>
                      }
                    </div>
                  </div>
                  <div className='e-comp'>
                  Explore Container
                  <FollowersList
                      followers={this.props.follower_users}
                      handleFollowerClick={"hey2"}
                      displayFollowerItem={(follower: any): JSX.Element => { return <FollowersListItem follower={follower}/> }}
                      />
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
