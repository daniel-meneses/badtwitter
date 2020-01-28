import React from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { postSubscriptionRequest } from '../../actions/subscription.js'
import { bindActionCreators } from 'redux'
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';
import SubscribeButton from '../../components/SubscribeButton/SubscribeButton';

class UserProfile extends React.Component<any, any> {

    submitFollowRequest = () => {
      this.props.postSubscriptionRequest(this.props.match.params.id)
    }

    public render() {
      let { users, pendingSubRequests} = this.props;
      let user = users[this.props.match.params.id]
      let isRequestPending = pendingSubRequests.includes(user.id)

        return (
            <div>
                This is top of user profile page
                <div>
                <div>{user.first_name}</div>
                <div>{user.last_name}</div>
                </div>
                <button className={'subscribe_request_button'}
                        disabled={isRequestPending}
                        onClick={this.submitFollowRequest}
                        >
                        {isRequestPending ? "Pending" : "Request Follow"}
                        </button>
              <ProfileFeed userId={user.id}/>
              <SubscribeButton userId={user.id} />
            </div>
        );
    }
}

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users,
    pendingSubRequests: state.subscription.pendingSubRequestUserIds
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({postSubscriptionRequest}, dispatch)
}

export default connect(mapStateToProps
  , mapDispatchToProps)(UserProfile);
