import React from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { postSubscriptionRequest } from '../../actions/subscription.js'
import { getProfileFeed } from '../../actions/feed.js'
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed';
import SubscribeButton from '../../components/SubscribeButton/SubscribeButton';

type Props = {
  pendingSubUserIds: Array<number>,
  users: { [index: string] :
              { user_id: number,
                first_name: number,
                last_name: any,
              }
            },
  profile: {
    timeline: {},
    isFetching: boolean,
    errors: null
  }
};

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users,
    pendingSubUserIds: state.subscriptions.pending.userIds,
    profile: {
      timeline: state.feed.profile.timeline,
      isFetching: state.feed.profile.isFetching,
      errors: state.feed.profile.errors
    }
  }
}

class UserProfile extends React.Component<any, any> {

    componentDidMount() {
      this.props.getProfileFeed(this.props.match.params.id);
    }

    submitFollowRequest = () => {
      this.props.postSubscriptionRequest(this.props.match.params.id)
    }

    public render() {
      let { users, pendingSubUserIds, profile} = this.props;
      let user = users[this.props.match.params.id]
      if (user === undefined && profile.isFetching) { return <div>Fetching</div>}
      if (user === undefined && !profile.isFetching) { return <>WTF</>}
      if (user === undefined && profile.errors) { return <>{profile.errors}</>}

        return (
            <div>
                <div className={'main_container'}>
                  <div className={'center_container'}>
                    <h2 className={'center_container_header'}> {user.alias} </h2>
                    <div className={'center_container_body'}>
                    <div className={'profile'}>
                      <img className='profile_avatar' src={user.avatar}/>
                      <span className='profile_alias'> {user.alias} </span>
                      <div className='profile_subscribe'>
                        <SubscribeButton userId={user.user_id} />
                      </div>
                        <div className='profile_full_name'> {user.first_name + " " + user.last_name} </div>
                        <div className='profile_bio'>This is my biography text. It will spread across the page and be limited to 240 characters.</div>
                    </div>
                  <ProfileFeed userId={user.user_id}/>
                </div>
                </div>
              </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, {postSubscriptionRequest, getProfileFeed})(UserProfile);
