import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { getUserById, postLike } from '../../actions/session.js'
import { postSubscriptionRequest } from '../../actions/subscription.js'
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
      var a: Array<any> = []
      if (this.props.userProfile.posts) {
        a = this.props.userProfile.posts
      }
        return (
            <div>
                Hello there!
                <span>{this.props.userProfile.email}</span>
                <span>{this.props.userProfile.first_name}</span>
                <span>{this.props.userProfile.last_name}</span>
                <button onClick={this.submitFollowRequest}>{this.props.pendingSubRequests.includes(this.props.userProfile.id) ? "Pending" : "Request Follow"}</button>
                { a.map(a => <PostMiniComponent handleLike={this.submitLike} key={a.id} post={a} handlePostUserClick={this.handlePostUserClick} />) }
            </div>
        );
    }
}

function mapStateToProps(state :any) {
  return {
    userProfile: state.profile.profile,
    pendingSubRequests: state.subscription.subscription_requests
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getUserById, postLike, postSubscriptionRequest}, dispatch)
  }

export default withRouter(connect(mapStateToProps
  , mapDispatchToProps)(UserProfile) as any);
