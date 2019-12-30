import React from 'react';
import { getFollowers } from '../../actions/followers.js'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { isObjectEmpty } from '../../commons/helpers'
import { goToUserProfile } from '../../commons/actions'
import FollowersListItem from '../../components/FollowersListItem/FollowersListItem';

interface FollowersList {
  followers? : object
}

class FollowersList extends React.Component<any, any> {

  componentDidMount() {
    this.props.getFollowers();
  }

   render() {
     let { followers={}, history } = this.props;
     if (followers.isFetching === true) { return <div> is fetching </div>}
     if (isObjectEmpty(followers)) { return <div> no followers </div> }
     return (
       <div>
       { Object.values(followers.dataMap).map((follower: any) =>
         <FollowersListItem key={follower.user.id}
                            follower={follower}
                            handleFollowerClick={() => goToUserProfile(history, follower.user.id)}
                            />)
        }
       </div>
    );
  }
}

function mapStateToProps(state :any) {
  return {
    followers: state.followers
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getFollowers}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowersList) as any);
