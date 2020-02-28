import React from 'react';
import './InboxListItem.scss'
import { connect } from 'react-redux'
import { acceptFollowerRequest, rejectFollowerRequest } from '../../actions/followers.js'
import { useHistory } from 'react-router-dom'

type Props = {
  user_id: number,
  acceptFollowerRequest: (e: any) => void,
  rejectFollowerRequest: (e: any) => void
  users: { [index: string] :
              { user_id: number,
                avatar: string,
                first_name: number,
                last_name: any,
              }
            },
  isFollowRequest: boolean
};

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users
  }
}

const InboxListItem = ({user_id, users, acceptFollowerRequest, rejectFollowerRequest, isFollowRequest} : Props) => {

  let user = users[user_id];
  let history = useHistory();

  return (
      <div className='follow_request'>
        <img src={user.avatar} />
        <span data-key={user.user_id} onClick={() => history.push("/user/" + user.user_id)}> {user.first_name} {user.last_name}</span>
        { isFollowRequest ?
        <div className='follow_request_buttons'>
          <button className='request_accept' onClick={() => acceptFollowerRequest({accepted : true, id: user.user_id})}> Accept </button>
          <button className='request_reject' onClick={() => rejectFollowerRequest({accepted : false, id: user.user_id})}> Decline </button>
        </div>
        : <></>
      }
      </div>
  );
}

export default connect(mapStateToProps, {acceptFollowerRequest, rejectFollowerRequest})(InboxListItem);
