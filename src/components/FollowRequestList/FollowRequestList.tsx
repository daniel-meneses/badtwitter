import React from 'react';
import { connect } from 'react-redux'
import InboxListItem from '../../components/InboxListItem/InboxListItem'

type Props = {
  followRequests: any
};

const FollowRequestList = ({followRequests} :Props) => {

  return (
    <div className='follow_request_list'>
      {
        Object.values(followRequests).map((request :any) =>
        <InboxListItem key={request.id}
                        user_id={request.user_id}
                        isFollowRequest={true}
                        />)
      }
    </div>)
  }

export default connect(null, {})(FollowRequestList);
