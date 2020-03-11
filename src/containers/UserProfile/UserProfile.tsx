import React from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { getProfileFeed } from '../../actions/feed.js'
import Trending from '../../components/Trending/Trending';
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed'
import ProfileHead from '../../components/ProfileHead/ProfileHead'
import GreenLoadingCircle from '../../components/ReactLoading/ReactLoading.js';
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
    isFetching: (state.feed.profile || {}).isFetching,
    error: (state.feed.profile || {}).errors
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
      let { users, profiles, match, isFetching, error, history} = this.props;
      let user = users[match.params.id] || {}
      let profile = profiles[match.params.id] || {}
      var profileTitle = "";
      var profileHead = null;
      var profileFeed = null;
      var loadingSpinner = null;

      // display user from memory
      if (user.alias) {
        profileHead = <ProfileHead user={user}/>
        profileTitle = user.alias
      }


      if (isFetching && !profile.timeline) {
        loadingSpinner = <GreenLoadingCircle size={'large'}/>
      } else if (isFetching && profile.timeline) {
        loadingSpinner = <GreenLoadingCircle size={'small'}/>
        profileFeed = <ProfileFeed profileTimeline={profile.timeline}/>
      } else if (error || !profile.timeline) {
        profileFeed = <EmptyListMessage message={"An error has occurred please refresh"} />
      } else if (profile.timeline.length === 0) {
        profileFeed = <EmptyListMessage message={"User has no posts!"} />
      } else {
        profileFeed = <ProfileFeed profileTimeline={profile.timeline}/>
      }

      const backArrow = <svg style={{width: "26px", height: "20px", stroke: 'green'}}>
                          <g>
                            <path d='M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z'/>
                          </g>
                        </svg>


        return (
                <div className={'main_container'}>
                  <div className={'center_container'}>
                    <h2 className={'center_container_header'}>
                    <span className={'header_back'}
                          onClick={() => history.goBack()}
                        > {backArrow}</span>
                      {profileTitle}
                    </h2>
                    <div className={'center_container_body'}>
                      {profileHead}
                      {loadingSpinner}
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
