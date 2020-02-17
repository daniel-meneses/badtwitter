import React from 'react';
import { getFollowers } from '../../actions/followers.js'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import FollowersListItem from '../../components/FollowersListItem/FollowersListItem'

interface FollowersList {
  followers : {
    accepted  : {
      followRequests: {},
      userIds: [],
      isFetching: false,
      error: null
    }
  }
}

function mapStateToProps(state :any) {
  return {
    followers: state.followers.accepted
  }
}

class FollowersList extends React.Component<any, any> {

  componentDidMount() {
    this.props.getFollowers();
  }

  render() {
     let { followers={} } = this.props;
     if (followers.isFetching === true) { return <div> is fetching </div>}
     if (isEmpty(followers.followRequests)) { return <div> no followers </div> }
     return (
       <div>
         {
          Object.values(followers.followRequests).map( (follower: any) =>
          <FollowersListItem key={follower.id}
                             follower={follower}
                             />
        )}
       </div>
    );
  }
}

export default connect(mapStateToProps, {getFollowers})(FollowersList);
