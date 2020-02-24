import React from 'react';
import './Home.scss';
import { getPendingSubscriptionRequests } from '../../actions/subscription.js'
import { getAllUserLikes} from '../../actions/like.js'
import { postMessage } from '../../actions/post.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import Trending from '../../components/Trending/Trending';
import GlobalFeed from '../../components/GlobalFeed/GlobalFeed';
import SideBar from '../../components/SideBar/SideBar';
import FollowersList from '../../components/FollowersList/FollowersList';

class Home extends React.Component<any, any> {

  componentDidMount() {
    this.props.getPendingSubscriptionRequests();
    this.props.getAllUserLikes();
  }

  public render() {
    let {logout, postMessage} = this.props

    return (
      <div className={'main_container'}>
        <div className={'center_container'}>
          <h2 className={'center_container_header'}> Home </h2>
          <div className={'center_container_body'}>
          <div className={'new_post_form'}>
            <PostForm handleFormSubmit={(e :any) => postMessage({message: e})} />
            </div>
            <GlobalFeed/>
            </div>
            </div>
              <div className={'right_container'}>
                <div className={'trending_container'}>
                  <Trending postId={1}/>
                </div>
              </div>
            <div>
          </div>
        </div>
      );
  }
}

export default connect(null
  , { postMessage, getPendingSubscriptionRequests, getAllUserLikes })(Home);
