import React from 'react';
import './UserProfile.scss';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { getUserById } from '../../actions/session.js'
import { postSubscriptionRequest } from '../../actions/subscription.js'
import {  postLike, deleteLike} from '../../actions/like.js'
import { bindActionCreators } from 'redux'
import { isObjectEmpty } from '../../commons/helpers'
import PostList from '../../components/PostList/PostList';

class UserProfile extends React.Component<any, any> {

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

    submitFollowRequest = () => {
      this.props.postSubscriptionRequest(this.props.userProfile.id)
    }

    handlePostUserClick = (e: any) => {
      this.goToUserProfile(e.target.getAttribute("data-key"))
    }

    handlePostLikeClick = (e: any) => {
      const isLiked = e.target.getAttribute("data-key");
      const data = {post_id: e.target.id}
      if (isLiked == "true") {
        this.props.deleteLike(data)
      } else {
        this.props.postLike(data)
      }
    }

    goToUserProfile = (id: number) => {
      this.props.history.push("/user/" + id)
    }

    public render() {
      let userProfile = this.props.userProfile
      let shouldDisplayFeed: boolean = !isObjectEmpty(userProfile.posts)
      let isRequestPending = this.props.pendingSubRequests.includes(userProfile.id)

        return (
            <div>
                This is top of user profile page
                <div>
                <span>{userProfile.email}</span>
                <span>{userProfile.first_name}</span>
                <span>{userProfile.last_name}</span>
                </div>
                <button className={'subscribe_request_button'}
                        disabled={isRequestPending}
                        onClick={this.submitFollowRequest}
                        >
                        {isRequestPending ? "Pending" : "Request Follow"}
                        </button>
                        {
                          shouldDisplayFeed ?
                          <PostList feed={userProfile.posts}
                                    handlePostLikeClick={this.handlePostLikeClick}
                                    handlePostUserClick={this.handlePostUserClick}
                                    hasBeenLiked={this.props.hasBeenLiked}
                           />
                          :
                          <></>
                        }
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
