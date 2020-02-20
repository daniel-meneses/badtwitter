import React from 'react';
import './FollowersListItem.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

type Props = {
  follower: {
    id: string,
    user_id: number
  },
  users: any
};

function mapStateToProps(state :any) {
  return {
    users: state.globalObject.users
  }
}

const FollowersListItem = ({follower, users} : Props) => {

  let user = users[follower.user_id]
  let history = useHistory()

  return (
      <div className={"follower_list_tem"}
           onClick={() => history.push('/user/' + user.id)}
           data-key={follower.id}>
        <img src={user.avatar} />
        <span>{user.id}</span>
        <span>{user.first_name}</span>
        <span>{user.last_name}</span>
      </div>
  );
}

export default connect(mapStateToProps, {})(FollowersListItem);
