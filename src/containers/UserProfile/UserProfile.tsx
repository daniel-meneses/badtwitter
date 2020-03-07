import React from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { getProfileFeed } from '../../actions/feed.js'
import Trending from '../../components/Trending/Trending';
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed'
import ProfileHead from '../../components/ProfileHead/ProfileHead'
import EmptyListMessage from '../../components/EmptyListMessage/EmptyListMessage'

type Props = {
  users: { [index: string] : {} },
  profiles: {timeline: Array<number>},
  isFetching: boolean,
  errors: null | string
};

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users,
    profiles: state.feed.profiles,
    isFetching: state.feed.profile.isFetching,
    error: state.feed.profile.errors
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
      let { users, profiles, match, isFetching, error} = this.props;
      let user = users[match.params.id] || {}
      let profile = profiles[match.params.id] || {}
      var profileTitle = "";
      var profileHead = null;
      var profileFeed = null;

      // display user from memory
      if (user.alias) {
        profileHead = <ProfileHead user={user}/>
        profileTitle = user.alias
      }


      if (isFetching && !profile.timeline) {
        profileFeed = <EmptyListMessage message={"Fetching"} />
      } else if (isFetching && profile.timeline) {
        // need to show small loading spinner
        profileFeed = <ProfileFeed profileTimeline={profile.timeline}/>
      } else if (error || !profile.timeline) {
        profileFeed = <EmptyListMessage message={"An error has occurred please refresh"} />
      } else if (profile.timeline.length === 0) {
        profileFeed = <EmptyListMessage message={"User has no posts!"} />
      } else {
        profileFeed = <ProfileFeed profileTimeline={profile.timeline}/>
      }

        return (
                <div className={'main_container'}>
                  <div className={'center_container'}>
                    <h2 className={'center_container_header'}>
                      {profileTitle}
                    </h2>
                    <div className={'center_container_body'}>
                      {profileHead}
                      {profileFeed}
                    </div>
                </div>
                <div className={'right_container'}>
                  <div className={'trending_container'}>
                    <Trending postId={1}/>
                  </div>
                </div>
                <div className='empty'>
              </div>
              </div>
        );
    }
}

export default connect(mapStateToProps, {getProfileFeed})(UserProfile);
