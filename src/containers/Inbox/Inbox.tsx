import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty'
import { getPendingFollowRequests } from '../../actions/followers.js'
import FollowRequest from '../../components/FollowRequest/FollowRequest';

type Props = {
  pendingFollowerRequest: {}
};

function mapStateToProps(state :any) {
  return {
    pendingFollowerRequest: state.followers.pending.followRequests
  }
}

class Inbox extends React.Component<any, any> {

    componentDidMount() {
      this.props.getPendingFollowRequests()
    }

    public render() {
      let {pendingFollowerRequest} = this.props
      if (isEmpty(pendingFollowerRequest)) { return <div>No Follow Requests</div> }
      return (
        <div>
        <span>Follow Requests</span>
          {
            Object.values(pendingFollowerRequest).map((request :any) =>
            <FollowRequest key={request.id}
                            request={request}
                            />)
          }
        </div>
      );
    }
}

export default connect(
    mapStateToProps
  , {getPendingFollowRequests})(Inbox);
