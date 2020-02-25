import React from 'react';
import './Home.scss';
import { getPendingSubscriptionRequests } from '../../actions/subscription.js'
import { getAllUserLikes} from '../../actions/like.js'
import { postMessage } from '../../actions/post.js'
import { getGlobalFeed } from '../../actions/feed.js'
import { connect } from 'react-redux';
import PostForm from '../../components/PostForm/PostForm';
import Trending from '../../components/Trending/Trending';
import GlobalFeed from '../../components/GlobalFeed/GlobalFeed';
import SideBar from '../../components/SideBar/SideBar';
import FollowersList from '../../components/FollowersList/FollowersList';
import EmptyListMessage from '../../components/EmptyListMessage/EmptyListMessage'


function mapStateToProps(state :any) {
  return {
    global: state.feed.global
  }
}

class Home extends React.Component<any, any> {

  componentDidMount() {
    this.props.getPendingSubscriptionRequests();
    this.props.getAllUserLikes();
    this.props.getGlobalFeed();
  }

  public render() {
    let {logout, postMessage, global={}} = this.props

    var globalFeed = null
    if (global.timeline === undefined) {
      globalFeed = <EmptyListMessage message={"An error has occurred.."} />
    } else if (global.timeline.length === 0) {
      globalFeed = <EmptyListMessage message={"There's nothing here yet.."} />
    } else {
      globalFeed = <GlobalFeed globalTimeline={global.timeline}/>
    }

    return (
      <div className={'main_container'}>
        <div className={'center_container'}>
          <h2 className={'center_container_header'}> Home </h2>
          <div className={'center_container_body'}>
          <div className={'new_post_form'}>
            <PostForm/>
            </div>
              {globalFeed}
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

export default connect(mapStateToProps
  , { postMessage, getPendingSubscriptionRequests, getAllUserLikes, getGlobalFeed })(Home);
