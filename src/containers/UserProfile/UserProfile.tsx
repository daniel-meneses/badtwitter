import React from 'react';
import './UserProfile.scss';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { getUserById } from '../../actions/session.js'
import { postSubscriptionRequest } from '../../actions/subscription.js'
import {  postLike, deleteLike} from '../../actions/like.js'
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

    handleLike = (e: any, hasBeenLiked: Boolean) => {
      if (hasBeenLiked) {
        this.props.deleteLike({post_id: e.target.id});
      } else {
        this.props.postLike({post_id: e.target.id});
      }
    }

    handlePostUserClick = (e: any) => {
    }

    submitFollowRequest = () => {
      this.props.postSubscriptionRequest(this.props.userProfile.id)
    }

    public render() {
      var requests: Array<number>  = this.props.pendingSubRequests ? this.props.pendingSubRequests : [];
      //TODO: Update this
      var userProfile = this.props.userProfile;
      var isRequestPending = requests.includes(userProfile.id);
      console.log(requests)
      console.log(userProfile.id)
      console.log(isRequestPending)
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
                { a.map(a => <PostMiniComponent
                              key={a.id} post={a}
                              handleLike={this.props.postLike}
                              handleUnlike={this.props.deleteLike}
                              hasBeenLiked={this.props.hasBeenLiked.includes(a.id)}
                              handlePostUserClick={this.handlePostUserClick} />) }
            </div>
        );
    }
}

function mapStateToProps(state :any) {
  return {
    userProfile: state.profile.profile,
    pendingSubRequests: state.subscription.subscription_request_ids,
    hasBeenLiked: state.post.hasBeenLiked
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getUserById, postLike, postSubscriptionRequest, deleteLike}, dispatch)
  }

export default withRouter(connect(mapStateToProps
  , mapDispatchToProps)(UserProfile) as any);
