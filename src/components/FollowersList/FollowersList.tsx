import React from 'react';
import { getFollowers } from '../../actions/followers.js'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import isEmpty from 'lodash/isEmpty'
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
     if (isEmpty(followers)) { return <div> no followers </div> }
     return (
       <div>

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
