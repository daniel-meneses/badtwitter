import React from 'react';
import './FollowRequest.scss'
import { connect } from 'react-redux'
import { acceptFollowerRequest, rejectFollowerRequest } from '../../actions/followers.js'
import { useHistory } from 'react-router-dom'

type Props = {
  request: {id: number, user_id: number},
  acceptFollowerRequest: (e: any) => void,
  rejectFollowerRequest: (e: any) => void
  users: { [index: string] :
              { id: number,
                first_name: number,
                last_name: any,
              }
            },
};

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users
  }
}

const FollowRequest = ({request, users, acceptFollowerRequest, rejectFollowerRequest} : Props) => {

  let user = users[request.user_id];
  let history = useHistory();

  return (
      <div className='follow_request'>
        <span data-key={user.id} onClick={() => history.push("/user/" + user.id)}> {user.first_name} {user.last_name}</span>
        <div className='follow_request_buttons'>
          <button className='request_accept' onClick={() => acceptFollowerRequest({accepted : true, id: request.id})}> Accept </button>
          <button className='request_reject' onClick={() => rejectFollowerRequest({accepted : false, id: request.id})}> Decline </button>
        </div>
      </div>
  );
}

export default connect(mapStateToProps, {acceptFollowerRequest, rejectFollowerRequest})(FollowRequest);
