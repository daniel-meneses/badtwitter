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

  logit = (e: any) => {
    console.log(e.target.getAttribute("data-key"))
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
    const shouldDisplayFollowers: boolean = !isObjectEmpty(this.props.follower_users);
    const shouldDisplayFeed: boolean = !isObjectEmpty(this.props.feed);

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
                      {
                        shouldDisplayFeed ?
                        <PostList feed={this.props.feed}
                                  handlePostLikeClick={this.handlePostLikeClick}
                                  handlePostUserClick={this.handlePostUserClick}
                                  hasBeenLiked={this.props.hasBeenLiked}
                                  displayPostMini={(post: any,
                                                    handlePostLikeClick: any,
                                                    handlePostUserClick: any,
                                                    hasBeenLiked: any): JSX.Element => {
                                    return <PostMini post={post}
                                            handlePostLikeClick={handlePostLikeClick}
                                            handlePostUserClick={handlePostUserClick}
                                            hasBeenLiked={hasBeenLiked}
                                            /> }}
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
                                   handleFollowerClick={this.logit}
                                   displayFollowerItem={(follower: any,
                                                         handleFollowerClick: any): JSX.Element => {
                                     return <FollowersListItem follower={follower}
                                                               handleFollowerClick={handleFollowerClick}
                                     /> }}
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
