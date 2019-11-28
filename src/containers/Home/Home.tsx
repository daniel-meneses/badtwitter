import React from 'react';
import { withRouter } from 'react-router'
import { logout, postMessage, addFriend, deleteFriend, updateRequest, getAllUsers, getGlobalFeed, postLike } from '../../actions/session.js'
import { getList } from '../../actions/subscription.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import PostMini from '../../components/PostMini/PostMini';
import SubscriptionRequest from '../../components/SubscriptionRequest/SubscriptionRequest';

class Home extends React.Component<any, any> {

  constructor(props: any){
    super(props);
  }

  componentDidMount() {
    this.getList();
    this.props.getAllUsers();
    this.props.getGlobalFeed();
  }

  logOut = () => {
    this.props.logout();
  }

  sendPost = (e: any) => {
    console.log(e)
    this.props.postMessage({message:e});
  }

  sendFriend = () => {
    this.props.addFriend({user_id: 7});
  }

  getList = () => {
    this.props.getList();
  }

  deleteFriend = () => {
    this.props.deleteFriend({user_id: 7});
  }

  getGlobalFeed =  () => {
    this.props.getGlobalFeed()
  }

  submitPostLike = (e: any) => {
    this.props.postLike({post_id: e.target.id});
  }

  updateRequest = (e: any) => {
    let user_id = e.currentTarget.parentNode.getAttribute("data-key")
    let pay = {user_id: user_id}
    console.log(pay)
    this.props.updateRequest({user_id: user_id, accepted: true})
  }


  public render() {
    console.log(this.props.feed)
      return (
          <div>
              This is home
              <PostForm submitMessage={this.sendPost}/>
              <button onClick={this.sendPost}>SEND IT</button>
              <button onClick={this.logOut}>LOGOUT</button>
              <button onClick={this.sendFriend}>ADD FRIEND</button>
              <button onClick={this.getList}>GET LIST</button>
              <button onClick={this.deleteFriend}>DELETE SUBSCRIPTION</button>
              <div>
                <span>ALL USERS</span>

              </div>


              <div>
                <span>SUBSCRIPTION REQUESTS</span>
                { this.props.request_list.length ?
                  this.props.request_list.map((r :any) =>
                  <SubscriptionRequest key={r.id}
                                        subscription={r}
                                        denyRequest={this.updateRequest}
                                        acceptRequest={this.updateRequest}/>)
                  :
                  <span>Was nill</span>
                }
              </div>

              <div>
                { this.props.feed.length ?
                  this.props.feed.map((p :any) =>
                  <PostMini key={p.id}
                            post={p}
                            onClick={this.submitPostLike}
                            />)
                  :
                  <span>Was nill</span>
                }
              </div>
          </div>
      );
  }
}

function mapStateToProps(state :any) {
  return {
    request_list: state.subscription.subscription_requests,
    feed: state.feed.global_feed
  }
}

export default withRouter(connect(mapStateToProps
  , { logout, postMessage, addFriend, getList, deleteFriend, updateRequest, getAllUsers , getGlobalFeed, postLike })(Home) as any);
