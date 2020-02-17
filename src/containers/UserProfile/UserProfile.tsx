import React from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { postSubscriptionRequest } from '../../actions/subscription.js'
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';
import SubscribeButton from '../../components/SubscribeButton/SubscribeButton';

type Props = {
  pendingSubUserIds: Array<number>,
  users: { [index: string] :
              { user_id: number,
                first_name: number,
                last_name: any,
              }
            }
};

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users,
    pendingSubUserIds: state.subscriptions.pending.userIds
  }
}

class UserProfile extends React.Component<any, any> {

    submitFollowRequest = () => {
      this.props.postSubscriptionRequest(this.props.match.params.id)
    }

    public render() {
      let { users, pendingSubUserIds} = this.props;
      let user = users[this.props.match.params.id]
      let isRequestPending = pendingSubUserIds.includes(user.user_id)

        return (
            <div>
                <div className={'main_container'}>
                <div className={'center_container'}>
                <h2> Profile Container </h2>
                <div className={'profile'}>
                  <h3> {user.first_name + " " + user.last_name}</h3>
                      <SubscribeButton userId={user.user_id} />
                </div>
                    <ProfileFeed userId={user.user_id}/>
                  </div>
              </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, {postSubscriptionRequest})(UserProfile);
