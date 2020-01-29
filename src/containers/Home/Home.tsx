import React from 'react';
import './Home.scss';
import { logout } from '../../actions/session.js'
import { getPendingSubscriptionRequests } from '../../actions/subscription.js'
import { getAllUserLikes} from '../../actions/like.js'
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

export default connect(null
  , { logout, postMessage, getPendingSubscriptionRequests, getAllUserLikes })(Home);
