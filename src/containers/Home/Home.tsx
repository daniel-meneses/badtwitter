import React from 'react';
import './Home.scss';
import { withRouter } from 'react-router'
import { logout } from '../../actions/session.js'
import { getPendingSubscriptionRequests, postSubscriptionRequest } from '../../actions/subscription.js'
import { getAllUserLikes, postLike, deleteLike} from '../../actions/like.js'
import { postMessage } from '../../actions/post.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import GlobalFeed from '../../components/GlobalFeed/GlobalFeed';
import Inbox from '../Inbox/Inbox';
import FollowersList from '../../components/FollowersList/FollowersList';

class Home extends React.Component<any, any> {

  componentDidMount() {
    this.props.getPendingSubscriptionRequests();
    this.props.getAllUserLikes();
  }

  public render() {
    let {logout, postMessage} = this.props

    return (
      <div className={'home_container'}>
        <div className='home_left_sidebar'>
          Sidebar Container
          <button onClick={() => logout()}>LogOut</button>
          <Inbox />
        </div>
        <div className='home_center_feed'>
          <PostForm handleFormSubmit={(e :any) => postMessage({message: e})} />
            <GlobalFeed/>
            </div>
          <div className='home_right_sidebar'>
            Explore Container
            <FollowersList />
            </div>
            <div>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state :any) {
  return {
    pendingSubscriptionRequests: state.subscription.subscription_request_ids,
    hasBeenLiked: state.post.hasBeenLiked
  }
}

export default withRouter(connect(mapStateToProps
  , { logout, postMessage, postLike, postSubscriptionRequest, getPendingSubscriptionRequests, getAllUserLikes, deleteLike })(Home) as any);
