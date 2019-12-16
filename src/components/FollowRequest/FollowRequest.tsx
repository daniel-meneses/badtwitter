import React from 'react';

const FollowRequest = (props: any) => {
  return (
      <div className='follow_request' data-key={props.id}>
        <span>{props.user.first_name + props.user.last_name}</span>
        <button value={'accept'} onClick={props.handleFollowRequest}> Accept </button>
        <button value={'decline'} onClick={props.handleFollowRequest}> Decline </button>
      </div>
  );
}

export default FollowRequest;
