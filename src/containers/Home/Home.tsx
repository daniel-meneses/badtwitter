import React from 'react';
import './Home.scss';
import { withRouter } from 'react-router'
import { logout } from '../../actions/session.js'
import { getPendingSubscriptionRequests, postSubscriptionRequest } from '../../actions/subscription.js'
import { getAllUserLikes, postLike, deleteLike} from '../../actions/like.js'
import { postMessage } from '../../actions/post.js'
import { connect } from 'react-redux';
import { isObjectEmpty } from '../../commons/helpers'
import { goToUserProfile } from '../../commons/actions'
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';
import GlobalFeed from '../../components/GlobalFeed/GlobalFeed';
import Inbox from '../Inbox/Inbox';
import FollowersList from '../../components/FollowersList/FollowersList';

class Home extends React.Component<any, any> {

  componentDidMount() {
    this.props.getPendingSubscriptionRequests();
    this.props.getAllUserLikes();
  }

  public render() {
    let {logout, history, postMessage} = this.props

    return (
      <div className={'g-fd'}>
        <div className='s-comp'>
          Sidebar Container
          <button onClick={() => logout()}>LogOut</button>
          <Inbox />
        </div>
        <div className='f-comp'>
          <PostForm handleFormSubmit={(e :any) => postMessage({message: e})} />
            <GlobalFeed/>
            </div>
          <div className='e-comp'>
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
