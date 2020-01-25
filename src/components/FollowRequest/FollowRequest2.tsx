import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acceptFollowerRequest, rejectFollowerRequest } from '../../actions/followers.js'

type Props = {
  request: {id: number, user_id: number},
  users: any,
  history: any,
  acceptFollowerRequest: (e: any) => void,
  rejectFollowerRequest: (e: any) => void
};

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({acceptFollowerRequest, rejectFollowerRequest}, dispatch)
}

const FollowRequest2 = ({request, history, users, acceptFollowerRequest, rejectFollowerRequest} : Props) => {

  let user = users[request.user_id];

  return (
      <div className='follow_request'>
        <span data-key={user.id} onClick={() => history.push("/user/" + user.id)}> {user.first_name} {user.last_name}</span>
        <button value={'accept'} onClick={() => acceptFollowerRequest({accepted : true, id: request.id})}> Accept </button>
        <button value={'decline'} onClick={() => rejectFollowerRequest({accepted : false, id: request.id})}> Decline </button>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowRequest2);
