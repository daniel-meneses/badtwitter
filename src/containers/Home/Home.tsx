import React from 'react';
import './Home.scss';
import { withRouter } from 'react-router'
import { logout, postMessage, getGlobalFeed, postLike, addFriend } from '../../actions/session.js'
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
    this.props.addFriend({user_id: 4})
  }

  public render() {
      return (
          <div className={'g-fd'}>
              <button onClick={this.logOut}>LOGOUT</button>
                <div className='f-comp'>
                  <PostForm className='f-pf-comp' submitMessage={this.sendPost}/>
                    <div>
                      { this.props.feed.length ?
                        this.props.feed.map((p :any) =>
                        <PostMini key={p.id}
                                  post={p}
                                  onClick={this.submitPostLike}
                                  />)
                        :
                        <span>Feed Empty</span>
                      }
                    </div>
                  </div>
          </div>
      );
  }
}

function mapStateToProps(state :any) {
  return {
    feed: state.feed.global_feed
  }
}

export default withRouter(connect(mapStateToProps
  , { logout, postMessage, getGlobalFeed, postLike, addFriend })(Home) as any);
