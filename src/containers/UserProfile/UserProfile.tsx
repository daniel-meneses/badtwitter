import React from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { postSubscriptionRequest } from '../../actions/subscription.js'
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';
import SubscribeButton from '../../components/SubscribeButton/SubscribeButton';

type Props = {
  pendingSubRequests: Array<number>,
  users: { [index: string] :
              { id: number,
                first_name: number,
                last_name: any,
              }
            }
};

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users,
    pendingSubRequests: state.subscription.pendingSubRequestUserIds
  }
}

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
                <div className={'main_container'}>
                <div className={'center_container'}>
                <h2> Profile Container </h2>
                <div className={'profile'}>
                  <h3> {user.first_name + " " + user.last_name}</h3>
                      <SubscribeButton userId={user.id} />
                </div>
                    <ProfileFeed userId={user.id}/>
                  </div>
              </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, {postSubscriptionRequest})(UserProfile);
