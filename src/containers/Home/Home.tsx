import React from 'react';
import './Home.scss';
import { withRouter } from 'react-router'
import { logout, postMessage, getGlobalFeed, postLike, postFollowRequest } from '../../actions/session.js'
import { getAllPendingSubscriptionRequests } from '../../actions/subscription.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import PostMini from '../../components/PostMini/PostMini';
import SubscriptionRequest from '../../components/SubscriptionRequest/SubscriptionRequest';

class Home extends React.Component<any, any> {

  constructor(props: any){
    super(props);
  }

  componentDidMount() {
    this.props.getGlobalFeed();
    this.props.getAllPendingSubscriptionRequests();
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

  submitPostLike = (e: any) => {
    this.props.postLike({post_id: e.target.id});
  }

  addFriend = () => {
    this.props.postFollowRequest({user_id: 4})
  }

  handlePostUserClick = (userId: number) => {
    this.props.history.push("/user/" + userId)
  }

  public render() {
    console.log(this.props.pendingSubscriptionRequests);
      return (
          <div className={'g-fd'}>
              <div className='s-comp'>
              Sidebar Container
              <button onClick={this.logOut}>LogOut</button>
              </div>
                <div className='f-comp'>
                  <PostForm className='f-pf-comp' submitMessage={this.sendPost}/>
                    <div>
                      { this.props.feed.length ?
                        this.props.feed.map((p :any) =>
                        <PostMini key={p.id}
                                  post={p}
                                  handleLike={this.submitPostLike}
                                  handlePostUserClick={this.handlePostUserClick}
                                  />)
                        :
                        <span>Feed Empty</span>
                      }
                    </div>
                  </div>
                  <div className='e-comp'>
                  Explore Container
                  </div>
          </div>
      );
  }
}

function mapStateToProps(state :any) {
  return {
    feed: state.feed.global_feed,
    pendingSubscriptionRequests: state.subscription.subscription_requests
  }
}

export default withRouter(connect(mapStateToProps
  , { logout, postMessage, getGlobalFeed, postLike, postFollowRequest, getAllPendingSubscriptionRequests })(Home) as any);
