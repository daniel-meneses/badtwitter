import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import isEmpty from 'lodash/isEmpty'
import { getPendingFollowRequests } from '../../actions/followers.js'
import FollowRequest from '../../components/FollowRequest/FollowRequest';
import FollowRequest2 from '../../components/FollowRequest/FollowRequest2';

type Props = {
  pendingFollowerRequest: {},
  pendingFollowReqUserIds: Array<number>
};

function mapStateToProps(state :any) {
  return {
    pendingFollowerRequest: state.followers.pending.followRequests,
    pendingFollowReqUserIds: state.followers.pending.listUserIds
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({getPendingFollowRequests}, dispatch)
}

class Inbox extends React.Component<any, any> {

    componentDidMount() {
      this.props.getPendingFollowRequests()
    }

    public render() {
      let {pendingFollowerRequest={}, history} = this.props
      if (isEmpty(pendingFollowerRequest)) { return <div>No Follow Requests</div> }
      return (
        <div>
        <span>Follow Requests</span>
          {
            Object.values(pendingFollowerRequest).map((request :any) =>
            <FollowRequest2 key={request.id}
                            request={request}
                            history={history}
                            />)
          }
        </div>
      );
    }
}

export default withRouter(connect(
    mapStateToProps
  , mapDispatchToProps)(Inbox) as any);
