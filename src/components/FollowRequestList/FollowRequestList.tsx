import React from 'react';
import { connect } from 'react-redux'
import { getPendingFollowRequests } from '../../actions/followers.js'
import FollowRequest from '../FollowRequest/FollowRequest'
import isEmpty from 'lodash/isEmpty'


type Props = {
  followRequests: {},
  getPendingFollowRequests: (e: any) => void
};

function mapStateToProps(state :any) {
  return {
    followRequests: state.followers.pending.followRequests
  }
}

class FollowRequestList extends React.Component<any, any> {

  componentDidMount() {
    this.props.getPendingFollowRequests()
  }

  render() {
    let {followRequests} = this.props
    if (isEmpty(followRequests)) {
      return (<div>No Follow Requests</div>)}

    return (
      <div className='follow_request_list'>
        {
          Object.values(followRequests).map((request :any) =>
          <FollowRequest key={request.id}
                          request={request}
                          />)
        }
      </div>)
    }
}

export default connect(mapStateToProps, {getPendingFollowRequests})(FollowRequestList);
