import React from 'react';
import { connect } from 'react-redux'
import FollowRequest from '../FollowRequest/FollowRequest'

type Props = {
  followRequests: any
};

const FollowRequestList = ({followRequests} :Props) => {
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

export default connect(null, {})(FollowRequestList);
