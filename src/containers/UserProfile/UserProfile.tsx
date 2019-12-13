import React from 'react';
import './UserProfile.scss';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { getUserById } from '../../actions/session.js'
import { postSubscriptionRequest } from '../../actions/subscription.js'
import { getAllUserLikes, postLike} from '../../actions/like.js'
import { bindActionCreators } from 'redux'
import PostMiniComponent from '../../components/PostMini/PostMini';

class UserProfile extends React.Component<any, any> {

    constructor(props: any){
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.getUserById(this.props.match.params.id);
    }

    submitLike = (e: any) => {
      this.props.postLike({post_id: e.target.id});
    }

    handlePostUserClick = (e: any) => {
    }

    submitFollowRequest = () => {
      this.props.postSubscriptionRequest(this.props.userProfile.id)
    }

    public render() {
      var userProfile = this.props.userProfile;
      var isRequestPending = this.props.pendingSubRequests.includes(userProfile.id);
      var a: Array<any> = []
      if (userProfile.posts) {
        a = userProfile.posts
      }
        return (
            <div>
                Hello there!
                <span>{userProfile.email}</span>
                <span>{userProfile.first_name}</span>
                <span>{userProfile.last_name}</span>
                <button disabled={isRequestPending} className={'request-button'} onClick={this.submitFollowRequest}>{isRequestPending ? "Pending" : "Request Follow"}</button>
                { a.map(a => <PostMiniComponent handleLike={this.submitLike} key={a.id} post={a} hasBeenLiked={this.props.hasBeenLiked.includes(a.id)} handlePostUserClick={this.handlePostUserClick} />) }
            </div>
        );
    }
}

function mapStateToProps(state :any) {
  return {
    userProfile: state.profile.profile,
    pendingSubRequests: state.subscription.subscription_requests,
    hasBeenLiked: state.post.hasBeenLiked
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getUserById, postLike, postSubscriptionRequest}, dispatch)
  }

export default withRouter(connect(mapStateToProps
  , mapDispatchToProps)(UserProfile) as any);
